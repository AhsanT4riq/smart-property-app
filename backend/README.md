## Backend

The backend is built with AWS serverless services, providing a scalable and cost-effective solution.

### Directory Structure

```
backend/
├── lib/                       # CDK infrastructure code
│   └── smart-property-stack.ts # Main CDK stack
├── lambda/                    # Lambda function handlers
│   ├── authorizers/           # Authorizer functions
│   ├── handlers/              # Handler functions
│   ├── handlers/properties/   # Property management functions
│   ├── handlers/maintenance/  # Maintenance request functions
│   └── utils/                 # Shared utilities for lambdas
├── bin/                       # CDK app entry point
├── cdk.json                   # CDK configuration
├── tsconfig.json              # TypeScript configuration
└── package.json               # Dependencies
```

### Key Services

- **API Gateway**: REST API endpoints
- **Lambda**: Serverless function handlers
- **DynamoDB**: NoSQL database for data storage
- **S3**: Storage for property images and documents
- **SNS**: Notification service
- **SQS**: Message queue for asynchronous processing
- **Cognito**: User authentication (integrating with Clerk)

### Database Schema

The backend uses the following DynamoDB tables:

1. **Properties**

   - Primary key: `id` (UUID)
   - GSI: `OwnerIdIndex` (partition key: `ownerId`)

2. **Tenants**

   - Primary key: `id` (UUID)
   - GSI: `PropertyIdIndex` (partition key: `propertyId`)

3. **Leases**

   - Primary key: `id` (UUID)
   - GSI: `PropertyIdIndex` (partition key: `propertyId`)
   - GSI: `TenantIdIndex` (partition key: `tenantId`)

4. **MaintenanceRequests**
   - Primary key: `id` (UUID)
   - GSI: `PropertyIdIndex` (partition key: `propertyId`)
   - GSI: `StatusDateIndex` (partition key: `status`, sort key: `createdAt`)

### Deploying the Backend

```bash
cd backend
yarn build
yarn cdk deploy
```
