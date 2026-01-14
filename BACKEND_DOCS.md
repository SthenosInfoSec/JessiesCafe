# Jessie's Café & Pizza - Backend documentation

This document details the serverless architecture, credentials, and deployment procedures for the Jessie's Café project.

## 1. Architecture Overview

The backend is built on **AWS Serverless** technologies:

*   **API Gateway (HTTP API)**: Acts as the entry point for all frontend requests. Routes traffic to specific Lambda functions.
    *   Endpoint: `https://h0ko7cn4ja.execute-api.eu-west-2.amazonaws.com`
*   **AWS Lambda (Node.js)**: Executes business logic.
    *   `JessiesContact`: Handles generic contact form submissions.
    *   `JessiesBooking`: Handles table reservation requests.
    *   `JessiesAdmin`: Protected function to retrieve bookings and messages for the dashboard.
*   **Amazon DynamoDB**: NoSQL database for data storage.
    *   `JessiesContacts`: Stores contact messages.
    *   `JessiesBookings`: Stores reservation details.
*   **Amazon Cognito**: Manages Admin authentication.
    *   User Pool: `JessiesCafeAdmins` (`eu-west-2_fTZM2TOWe`)
    *   App Client: `JessiesAdminApp` (`5uob9vnl9u9l070t9b1t9g5fo6`)
    *   The API Gateway validates JWT tokens issued by this pool for `/admin/*` routes.

## 2. Admin Credentials

An initial admin user has been provisioned.

*   **URL**: `https://[your-cloudfront-url]/admin`
*   **Username**: `admin`
*   **Password**: `JessiesCafe2026!!`

> **Note**: On first login, the application handles the "Force Change Password" challenge by simply setting the password to the one provided above, making it permanent.

## 3. Local Development & Deployment

### Dependencies
Ensure `npm install` has been run to install `amazon-cognito-identity-js` and `react-hook-form`.

### Deployment Scripts
*   **`setup_aws.sh`**: Initial infrastructure provisioning (S3, Tables).
*   **`deploy_backend.sh`**: Deploys Lambda code, updates API Gateway configuration, and packages the backend.

### Frontend Deployment
To deploy changes to the frontend (Next.js):
```bash
# 1. Build the static site
npm run build

# 2. Sync to S3
aws s3 sync out/ s3://jessiescafe-website --profile mvp --delete

# 3. Invalidate CloudFront (to see changes immediately)
aws cloudfront create-invalidation --distribution-id [YOUR_DIST_ID] --paths "/*" --profile mvp
```

## 4. API Reference

| Method | Route | Auth | Description |
| :--- | :--- | :--- | :--- |
| POST | `/contact` | Public | Submit contact form. Body: `{ name, email, message }` |
| POST | `/booking` | Public | Submit booking. Body: `{ name, date, time, guests, phone, email }` |
| GET | `/admin/bookings` | **JWT** | Admin only. Returns list of bookings. |
| GET | `/admin/messages` | **JWT** | Admin only. Returns list of messages. |
