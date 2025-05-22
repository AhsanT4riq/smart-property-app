# Changelog

All notable changes to the Smart Property App Backend will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [Unreleased]

### Added

- Initial project setup with AWS CDK
- Basic project structure with TypeScript configuration
- AWS CDK stack with DynamoDB tables for:
  - Properties
  - Tenants
  - Leases
  - Maintenance requests
- API Gateway setup with CORS support
- Lambda function handlers for:
  - `createProperty`: Create new properties
  - `getProperty`: Retrieve property details by ID
- Shared API response utilities
- IAM roles and permissions for Lambda functions

### Changed

- N/A

### Deprecated

- N/A

### Removed

- N/A

### Fixed

- N/A

### Security

- N/A

## [0.1.0] - 2025-05-22

### Added

- Initial project setup
- Basic CDK configuration
- Core infrastructure components

---

## Versioning Guidelines

- **MAJOR** version for incompatible API changes
- **MINOR** version for added functionality in a backward-compatible manner
- **PATCH** version for backward-compatible bug fixes

## How to Update

### Added

- New features or significant functionality
- New API endpoints
- New environment variables

### Changed

- Changes in existing functionality
- API response structure changes
- Configuration changes

### Deprecated

- Soon-to-be removed features
- Planned breaking changes in future versions

### Removed

- Removed features
- Breaking changes

### Fixed

- Bug fixes
- Security fixes

### Security

- Security-related changes
- Dependency updates with security implications
