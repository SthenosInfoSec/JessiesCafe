#!/bin/bash
set -e
AWS_PROFILE="mvp"
REGION="eu-west-2"
ACCOUNT_ID="851725562954"
ROLE_NAME="JessiesLambdaRole"
POOL_ARN="arn:aws:cognito-idp:eu-west-2:851725562954:userpool/eu-west-2_fTZM2TOWe"

echo ">>> 1. Creating IAM Role..."
cat > trust-policy.json <<EOF
{
  "Version": "2012-10-17",
  "Statement": [
    {
      "Effect": "Allow",
      "Principal": {
        "Service": "lambda.amazonaws.com"
      },
      "Action": "sts:AssumeRole"
    }
  ]
}
EOF

if ! aws iam get-role --role-name $ROLE_NAME --profile $AWS_PROFILE >/dev/null 2>&1; then
  aws iam create-role --role-name $ROLE_NAME --assume-role-policy-document file://trust-policy.json --profile $AWS_PROFILE
  aws iam attach-role-policy --role-name $ROLE_NAME --policy-arn arn:aws:iam::aws:policy/service-role/AWSLambdaBasicExecutionRole --profile $AWS_PROFILE
  aws iam attach-role-policy --role-name $ROLE_NAME --policy-arn arn:aws:iam::aws:policy/AmazonDynamoDBFullAccess --profile $AWS_PROFILE
  echo "Role created. Waiting for propagation..."
  sleep 10
else
  echo "Role exists."
fi

echo ">>> 2. Packaging & Deploying Lambdas..."
cd backend/lambda
npm init -y
npm install @aws-sdk/client-dynamodb @aws-sdk/lib-dynamodb

# Zip functions
zip -r contact.zip contact.js node_modules
zip -r booking.zip booking.js node_modules
zip -r admin.zip admin.js node_modules

# Deploy Contact
if aws lambda get-function --function-name JessiesContact --profile $AWS_PROFILE >/dev/null 2>&1; then
  aws lambda update-function-code --function-name JessiesContact --zip-file fileb://contact.zip --profile $AWS_PROFILE
else
  aws lambda create-function --function-name JessiesContact --runtime nodejs18.x --role arn:aws:iam::$ACCOUNT_ID:role/$ROLE_NAME --handler contact.handler --zip-file fileb://contact.zip --region $REGION --profile $AWS_PROFILE
fi

# Deploy Booking
if aws lambda get-function --function-name JessiesBooking --profile $AWS_PROFILE >/dev/null 2>&1; then
  aws lambda update-function-code --function-name JessiesBooking --zip-file fileb://booking.zip --profile $AWS_PROFILE
else
  aws lambda create-function --function-name JessiesBooking --runtime nodejs18.x --role arn:aws:iam::$ACCOUNT_ID:role/$ROLE_NAME --handler booking.handler --zip-file fileb://booking.zip --region $REGION --profile $AWS_PROFILE
fi

# Deploy Admin
if aws lambda get-function --function-name JessiesAdmin --profile $AWS_PROFILE >/dev/null 2>&1; then
  aws lambda update-function-code --function-name JessiesAdmin --zip-file fileb://admin.zip --profile $AWS_PROFILE
else
  aws lambda create-function --function-name JessiesAdmin --runtime nodejs18.x --role arn:aws:iam::$ACCOUNT_ID:role/$ROLE_NAME --handler admin.handler --zip-file fileb://admin.zip --region $REGION --profile $AWS_PROFILE
fi

echo ">>> 3. Setting up HTTP API Gateway..."
# Check if API exists (simplified check)
API_ID=$(aws apigatewayv2 get-apis --profile $AWS_PROFILE | grep -B 1 "JessiesApi" | head -n 1 | awk -F'"' '{print $4}')

if [ -z "$API_ID" ]; then
  echo "Creating API..."
  API_ID=$(aws apigatewayv2 create-api --name JessiesApi --protocol-type HTTP --cors-configuration "AllowOrigins=['*'],AllowMethods=['POST','GET','OPTIONS'],AllowHeaders=['content-type','authorization']" --profile $AWS_PROFILE --output text --query ApiId)
else
  echo "API exists: $API_ID"
fi

echo "API ID: $API_ID"

# Integrations
CONTACT_INT=$(aws apigatewayv2 create-integration --api-id $API_ID --integration-type AWS_PROXY --integration-uri arn:aws:lambda:$REGION:$ACCOUNT_ID:function:JessiesContact --payload-format-version 2.0 --profile $AWS_PROFILE --output text --query IntegrationId)
BOOKING_INT=$(aws apigatewayv2 create-integration --api-id $API_ID --integration-type AWS_PROXY --integration-uri arn:aws:lambda:$REGION:$ACCOUNT_ID:function:JessiesBooking --payload-format-version 2.0 --profile $AWS_PROFILE --output text --query IntegrationId)
ADMIN_INT=$(aws apigatewayv2 create-integration --api-id $API_ID --integration-type AWS_PROXY --integration-uri arn:aws:lambda:$REGION:$ACCOUNT_ID:function:JessiesAdmin --payload-format-version 2.0 --profile $AWS_PROFILE --output text --query IntegrationId)

# Routes
aws apigatewayv2 create-route --api-id $API_ID --route-key "POST /contact" --target "integrations/$CONTACT_INT" --profile $AWS_PROFILE
aws apigatewayv2 create-route --api-id $API_ID --route-key "POST /booking" --target "integrations/$BOOKING_INT" --profile $AWS_PROFILE

# Authorizer
AUTH_ID=$(aws apigatewayv2 create-authorizer --api-id $API_ID --authorizer-type JWT --name JessiesCognitoAuth --identity-source '$request.header.Authorization' --jwt-configuration "Audience=['5uob9vnl9u9l070t9b1t9g5fo6'],Issuer='https://cognito-idp.$REGION.amazonaws.com/eu-west-2_fTZM2TOWe'" --profile $AWS_PROFILE --output text --query AuthorizerId)

aws apigatewayv2 create-route --api-id $API_ID --route-key "GET /admin/messages" --target "integrations/$ADMIN_INT" --authorization-type JWT --authorizer-id $AUTH_ID --profile $AWS_PROFILE
aws apigatewayv2 create-route --api-id $API_ID --route-key "GET /admin/bookings" --target "integrations/$ADMIN_INT" --authorization-type JWT --authorizer-id $AUTH_ID --profile $AWS_PROFILE

# Permissions
aws lambda add-permission --function-name JessiesContact --statement-id apigateway-contact --action lambda:InvokeFunction --principal apigateway.amazonaws.com --source-arn "arn:aws:execute-api:$REGION:$ACCOUNT_ID:$API_ID/*/*/contact" --profile $AWS_PROFILE || true
aws lambda add-permission --function-name JessiesBooking --statement-id apigateway-booking --action lambda:InvokeFunction --principal apigateway.amazonaws.com --source-arn "arn:aws:execute-api:$REGION:$ACCOUNT_ID:$API_ID/*/*/booking" --profile $AWS_PROFILE || true
aws lambda add-permission --function-name JessiesAdmin --statement-id apigateway-admin --action lambda:InvokeFunction --principal apigateway.amazonaws.com --source-arn "arn:aws:execute-api:$REGION:$ACCOUNT_ID:$API_ID/*/*/admin/*" --profile $AWS_PROFILE || true

echo ">>> Deployment Complete!"
echo "API Endpoint: https://$API_ID.execute-api.$REGION.amazonaws.com"
