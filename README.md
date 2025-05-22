# Smart Property App

A modern property management application with a serverless backend and a cross-platform mobile frontend.

## Overview

Smart Property App is a comprehensive solution for property owners and managers to:

- Manage all properties in one place
- Track maintenance requests effortlessly
- Monitor rental income and expenses

## Project Structure

This repository uses a monorepo structure to organize the codebase into focused modules.

```
smart-property-app/
├── mobile/         # React Native Expo mobile app
├── shared/         # Shared types & utilities
├── backend/        # AWS serverless backend
├── README.md       # Project documentation
└── package.json    # Root package configuration
```

## Tech Stack

| Component        | Technology                                      |
| ---------------- | ----------------------------------------------- |
| Frontend         | React Native, Expo, NativeWind, Reanimated      |
| Backend          | AWS Lambda, DynamoDB, API Gateway, S3, SNS, SQS |
| Authentication   | Clerk                                           |
| State Management | React Context + Custom Hooks                    |
| Navigation       | Expo Router                                     |
| Styling          | NativeWind (TailwindCSS for React Native)       |
| Build Tools      | EAS (Expo Application Services)                 |
| Infrastructure   | AWS CDK                                         |

## Getting Started

### Prerequisites

- Node.js (v18 or later)
- Yarn package manager
- AWS account
- Clerk account
- Expo account (for EAS builds)

### Installation

1. Clone the repository

```bash
git clone https://github.com/yourusername/smart-property-app.git
cd smart-property-app
```

2. Install dependencies

```bash
yarn install
```

## Mobile App

The mobile app is built with React Native and Expo, providing a cross-platform solution for iOS and Android.

### Directory Structure

```
mobile/
├── app/                     # Expo Router app directory
│   ├── (auth)/              # Authentication screens
│   ├── (tabs)/              # Main app tabs
│   ├── property/            # Property-related screens
│   ├── maintenance/         # Maintenance-related screens
│   └── _layout.tsx          # Root layout with authentication
├── components/              # Reusable UI components
├── hooks/                   # Custom React hooks
├── api/                     # API integration with backend
├── utils/                   # Utility functions
├── assets/                  # Static assets
│   ├── images/              # App images
│   └── fonts/               # Custom fonts
├── constants/               # App constants
├── styles/                  # Global styles
├── app.json                 # Expo configuration
├── babel.config.js          # Babel configuration
├── global.css               # Global CSS for NativeWind
├── package.json             # Dependencies
└── tailwind.config.js       # TailwindCSS configuration
```

### Key Features

- **Authentication**: Secure sign-in with Clerk (Google OAuth)
- **Property Management**: Create, view, and edit properties
- **Maintenance Tracking**: Submit and track maintenance requests
- **Dashboard**: Overview of properties and maintenance status
- **Offline Support**: Basic functionality when offline

### Running the Mobile App

```bash
cd mobile
yarn start
```

For development build:

```bash
eas build --profile development --platform ios
```

## Backend

The backend is built with AWS serverless services, providing a scalable and cost-effective solution.

### Directory Structure

```
backend/ # Backend infrastructure and Lambda functions │ ├── bin/ # CDK application entry point │ ├── lambda/ # Lambda function handlers │ │ ├── authorizers/ # API Gateway authorizers │ │ └── handlers/ # Request handlers │ │ ├── properties/ # Property-related endpoints │ │ └── test/ # Test endpoints (development only) │ ├── lib/ # CDK stack definitions │ ├── cdk.json # CDK configuration │ ├── package.json # Backend dependencies │ └── tsconfig.json # TypeScript configuration

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

## Shared

The shared directory contains types, utilities, and other code that is used across both frontend and backend.

### Directory Structure

```
shared/
├── types/                # TypeScript interfaces
│   ├── property.ts       # Property-related types
│   ├── maintenance.ts    # Maintenance-related types
│   ├── tenant.ts         # Tenant-related types
│   ├── lease.ts          # Lease-related types
│   └── index.ts          # Type exports
├── utils/                # Shared utility functions
│   ├── date.ts           # Date formatting utilities
│   ├── validation.ts     # Validation utilities
│   └── index.ts          # Utility exports
├── constants/            # Shared constants
│   ├── status.ts         # Status constants
│   └── index.ts          # Constant exports
├── package.json          # Dependencies
└── tsconfig.json         # TypeScript configuration
```

## API Documentation

The API is organized around REST principles:

- **Authentication**: All API requests require authentication using Clerk JWT tokens
- **Base URL**: `https://api.smartproperty.app/`
- **Content Type**: All requests and responses use JSON format

### Endpoints

**Properties**

- `GET /properties` - Get all properties
- `POST /properties` - Create a new property
- `GET /properties/{id}` - Get property details
- `PUT /properties/{id}` - Update property
- `DELETE /properties/{id}` - Delete property

**Maintenance Requests**

- `GET /maintenance` - Get all maintenance requests
- `POST /maintenance` - Create a new maintenance request
- `GET /maintenance/{id}` - Get maintenance request details
- `PUT /maintenance/{id}` - Update maintenance request
- `DELETE /maintenance/{id}` - Delete maintenance request

**Tenants**

- `GET /tenants` - Get all tenants
- `POST /tenants` - Create a new tenant
- `GET /tenants/{id}` - Get tenant details
- `PUT /tenants/{id}` - Update tenant
- `DELETE /tenants/{id}` - Delete tenant

**Leases**

- `GET /leases` - Get all leases
- `POST /leases` - Create a new lease
- `GET /leases/{id}` - Get lease details
- `PUT /leases/{id}` - Update lease
- `DELETE /leases/{id}` - Delete lease

## Environment Variables

### Mobile App

Create a `.env` file in the mobile directory with the following variables:

```
EXPO_PUBLIC_API_URL=https://yourapi.execute-api.region.amazonaws.com/prod
EXPO_PUBLIC_CLERK_PUBLISHABLE_KEY=your_clerk_publishable_key
```

### Backend

The backend environment variables are managed through AWS CDK and are injected into each Lambda function as needed.

## Contributing

1. Fork the repository
2. Create your feature branch: `git checkout -b feature/amazing-feature`
3. Commit your changes: `git commit -m 'Add some amazing feature'`
4. Push to the branch: `git push origin feature/amazing-feature`
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the LICENSE file for details.

## Contact

Ahsan Tariq - ahsan_work@outlook.com

Project Link: [https://github.com/yourusername/smart-property-app](https://github.com/yourusername/smart-property-app)

---

© 2025 Smart Property App. All Rights Reserved.
