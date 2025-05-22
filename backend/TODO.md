# Backend TODO List

This file tracks all the planned enhancements and tasks for the Smart Property App Backend. As tasks are completed, they will be moved to the "Completed" section at the bottom.

## High Priority

### Authentication & Authorization

- [ ] Integrate Clerk for authentication
  - [ ] Set up Clerk AWS Lambda authorizer
  - [ ] Protect API endpoints with JWT validation
  - [ ] Implement role-based access control (RBAC)
  - [ ] Add user context to API requests

### Core API Endpoints

- [ ] Property Management

  - [ ] Update property (PUT /properties/{id})
  - [ ] Delete property (DELETE /properties/{id})
  - [ ] List all properties (GET /properties)
  - [ ] Search/filter properties (GET /properties?query=)

- [ ] Tenant Management

  - [ ] Create tenant (POST /tenants)
  - [ ] Get tenant details (GET /tenants/{id})
  - [ ] Update tenant (PUT /tenants/{id})
  - [ ] Delete tenant (DELETE /tenants/{id})
  - [ ] List tenants by property (GET /properties/{id}/tenants)

- [ ] Lease Management

  - [ ] Create lease (POST /leases)
  - [ ] Get lease details (GET /leases/{id})
  - [ ] Update lease (PUT /leases/{id})
  - [ ] Terminate lease (DELETE /leases/{id})
  - [ ] List leases by property (GET /properties/{id}/leases)
  - [ ] List active leases (GET /leases/active)

- [ ] Maintenance Requests
  - [ ] Create maintenance request (POST /maintenance)
  - [ ] Get maintenance request (GET /maintenance/{id})
  - [ ] Update maintenance status (PATCH /maintenance/{id}/status)
  - [ ] List maintenance by property (GET /properties/{id}/maintenance)
  - [ ] List maintenance by status (GET /maintenance?status=)

## Infrastructure

### Environment Configuration

- [ ] Set up environment-specific configurations (dev/staging/prod)
- [ ] Manage secrets using AWS Secrets Manager
- [ ] Configure proper VPC and networking
- [ ] Set up custom domains for API Gateway

### Monitoring & Logging

- [ ] Set up CloudWatch Alarms
- [ ] Configure structured logging
- [ ] Implement request/response logging
- [ ] Set up X-Ray for distributed tracing
- [ ] Create operational dashboards

### CI/CD Pipeline

- [ ] Set up GitHub Actions for CI/CD
- [ ] Configure automated testing
- [ ] Implement blue/green deployments
- [ ] Set up rollback mechanisms

## Code Quality & Testing

### Testing

- [ ] Unit tests for Lambda functions
- [ ] Integration tests for API endpoints
- [ ] Load testing
- [ ] Security scanning
- [ ] Test coverage reporting

### Code Quality

- [ ] Set up ESLint with TypeScript
- [ ] Configure Prettier
- [ ] Add commit hooks
- [ ] Document API with OpenAPI/Swagger
- [ ] Add JSDoc to all functions

## Future Enhancements

### Performance

- [ ] Implement caching with Redis/DynamoDB DAX
- [ ] Add API Gateway caching
- [ ] Implement pagination for list endpoints
- [ ] Add rate limiting

### Features

- [ ] File upload for property images
- [ ] Document generation (leases, invoices)
- [ ] Email notifications
- [ ] SMS notifications
- [ ] Payment processing integration
- [ ] Reporting endpoints

## Completed

### v0.1.0 - 2025-05-22

- [x] Initial project setup with AWS CDK
- [x] Basic project structure with TypeScript
- [x] Core DynamoDB tables
- [x] API Gateway setup
- [x] Basic Lambda functions for property management

## Notes

- Use checkboxes [ ] to mark incomplete items
- Move completed items to the "Completed" section with date
- Add new items as needed
- Reference related issues/PRs when available

## How to Contribute

1. Pick a task from the list above
2. Create a feature branch: `git checkout -b feature/your-feature-name`
3. Implement your changes
4. Write tests if applicable
5. Update documentation (including this file)
6. Submit a pull request

## Resources

- [AWS CDK Documentation](https://docs.aws.amazon.com/cdk/v2/guide/home.html)
- [AWS Lambda Best Practices](https://docs.aws.amazon.com/lambda/latest/operatorguide/best-practices.html)
- [REST API Best Practices](https://restfulapi.net/)
- [TypeScript Documentation](https://www.typescriptlang.org/docs/)
