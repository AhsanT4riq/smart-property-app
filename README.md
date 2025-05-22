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
