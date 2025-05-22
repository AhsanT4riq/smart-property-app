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
