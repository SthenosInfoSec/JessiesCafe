#!/bin/bash
set -e

# Configuration
AWS_PROFILE="mvp"
REGION="eu-west-2"
DISTRIBUTION_ID="E2SXQ587JOGGGT" # Jessie's Cafe Website Distribution
BUCKET_NAME="jessiescafe-website"

echo ">>> Fixing SPA Routing Configuration..."

# 1. Update S3 Website Configuration
echo ">>> Updating S3 Bucket Website Configuration..."
# Set both index and error document to index.html for SPA routing
aws s3 website s3://$BUCKET_NAME --index-document index.html --error-document index.html --profile $AWS_PROFILE

# 2. Update CloudFront Distribution Custom Error Responses
echo ">>> Updating CloudFront Distribution Custom Error Responses..."

# Get current distribution config
aws cloudfront get-distribution-config --id $DISTRIBUTION_ID --profile $AWS_PROFILE > raw_config.json

# Extract ETag (required for update)
ETAG=$(jq -r '.ETag' raw_config.json)

# Extract just the DistributionConfig object
jq '.DistributionConfig' raw_config.json > base_config.json

# Modify config to add/update CustomErrorResponses
# We need to handle 403 and 404, redirecting them to /index.html with 200 OK
jq '.CustomErrorResponses = {
  "Quantity": 2,
  "Items": [
    {
      "ErrorCode": 403,
      "ResponsePagePath": "/index.html",
      "ResponseCode": "200",
      "ErrorCachingMinTTL": 10
    },
    {
      "ErrorCode": 404,
      "ResponsePagePath": "/index.html",
      "ResponseCode": "200",
      "ErrorCachingMinTTL": 10
    }
  ]
}' base_config.json > updated_config.json

# Apply update
aws cloudfront update-distribution \
    --id $DISTRIBUTION_ID \
    --distribution-config file://updated_config.json \
    --if-match $ETAG \
    --profile $AWS_PROFILE

# Cleanup
rm raw_config.json base_config.json updated_config.json

echo ">>> SPA Routing Fix Applied Successfully!"
echo ">>> CloudFront update is in progress (may take a few minutes to fully propagate)."
