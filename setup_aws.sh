#!/bin/bash
set -e

# Jessie's Café & Pizza - AWS Setup Script
# Based on project requirements.
# Usage: ./setup_aws.sh

AWS_PROFILE="mvp"
AWS_REGION="eu-west-2"
ACCOUNT_ID=$(aws sts get-caller-identity --query Account --output text --profile $AWS_PROFILE)

echo "Using Profile: $AWS_PROFILE"
echo "Region: $AWS_REGION"
echo "Account ID: $ACCOUNT_ID"

# 1. Create S3 Buckets
echo ">>> Creating S3 Buckets..."
# Website Bucket
if aws s3 ls "s3://jessiescafe-website" --profile $AWS_PROFILE 2>&1 | grep -q 'NoSuchBucket'; then
  aws s3 mb s3://jessiescafe-website --region $AWS_REGION --profile $AWS_PROFILE
  aws s3 website s3://jessiescafe-website --index-document index.html --error-document index.html --profile $AWS_PROFILE
else
  echo "Bucket jessiescafe-website already exists."
fi

# Images Bucket
if aws s3 ls "s3://jessiescafe-images" --profile $AWS_PROFILE 2>&1 | grep -q 'NoSuchBucket'; then
  aws s3 mb s3://jessiescafe-images --region $AWS_REGION --profile $AWS_PROFILE
else
    echo "Bucket jessiescafe-images already exists."
fi

# Logs Bucket
if aws s3 ls "s3://jessiescafe-logs" --profile $AWS_PROFILE 2>&1 | grep -q 'NoSuchBucket'; then
    aws s3 mb s3://jessiescafe-logs --region $AWS_REGION --profile $AWS_PROFILE
else
    echo "Bucket jessiescafe-logs already exists."
fi

# 2. Create DynamoDB Tables
echo ">>> Creating DynamoDB Tables..."
# Menu Table
if aws dynamodb describe-table --table-name JessiesMenu --region $AWS_REGION --profile $AWS_PROFILE >/dev/null 2>&1; then
    echo "Table JessiesMenu already exists."
else
    aws dynamodb create-table \
        --table-name JessiesMenu \
        --attribute-definitions AttributeName=MenuType,AttributeType=S AttributeName=ItemID,AttributeType=S \
        --key-schema AttributeName=MenuType,KeyType=HASH AttributeName=ItemID,KeyType=RANGE \
        --billing-mode PAY_PER_REQUEST --region $AWS_REGION --profile $AWS_PROFILE
fi

# Events Table
if aws dynamodb describe-table --table-name JessiesEvents --region $AWS_REGION --profile $AWS_PROFILE >/dev/null 2>&1; then
     echo "Table JessiesEvents already exists."
else
    aws dynamodb create-table \
        --table-name JessiesEvents \
        --attribute-definitions AttributeName=EventID,AttributeType=S \
        --key-schema AttributeName=EventID,KeyType=HASH \
        --billing-mode PAY_PER_REQUEST --region $AWS_REGION --profile $AWS_PROFILE
fi

# 3. Create Cognito User Pool
# Note: Idempotency is harder here, checks if exists by name listing (simplified)
echo ">>> Creation of Cognito User Pool 'JessiesCafeAdmins'..."
# This part is interactive/complex to script idempotently without more logic.
# Printing instructions or running blind creation (which might duplicate).
# For this script, we will assume it needs to be created or checked manually to avoid duplicates.
# Use the CLI command from the prompt manually if needed, or uncomment below:

# aws cognito-idp create-user-pool --pool-name JessiesCafeAdmins --region $AWS_REGION --profile $AWS_PROFILE

echo "Setup script paused. Cognito and IAM roles require capturing outputs (PoolId, RoleArn). Please execute specific steps manually or enhance this script to capture JSON outputs."
