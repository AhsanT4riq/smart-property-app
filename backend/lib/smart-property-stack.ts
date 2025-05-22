import * as cdk from "aws-cdk-lib";
import * as dynamodb from "aws-cdk-lib/aws-dynamodb";
import * as lambda from "aws-cdk-lib/aws-lambda";
import * as apigw from "aws-cdk-lib/aws-apigateway";
import * as iam from "aws-cdk-lib/aws-iam";
import * as path from "path";
import { Construct } from "constructs";
import { NodejsFunction } from "aws-cdk-lib/aws-lambda-nodejs";

export class SmartPropertyStack extends cdk.Stack {
  constructor(scope: Construct, id: string, props?: cdk.StackProps) {
    super(scope, id, props);

    // Get Clerk configuration from environment variables
    const clerkJwksUri = process.env.CLERK_JWKS_URI;
    const clerkIssuer = process.env.CLERK_ISSUER;

    if (!clerkJwksUri || !clerkIssuer) {
      throw new Error(
        "CLERK_JWKS_URI and CLERK_ISSUER must be set in environment variables"
      );
    }

    // Create DynamoDB tables
    const propertiesTable = new dynamodb.Table(this, "PropertiesTable", {
      partitionKey: { name: "id", type: dynamodb.AttributeType.STRING },
      billingMode: dynamodb.BillingMode.PAY_PER_REQUEST,
      removalPolicy: cdk.RemovalPolicy.DESTROY, // Change to RETAIN in production
    });

    // Add GSI for owner query
    propertiesTable.addGlobalSecondaryIndex({
      indexName: "OwnerIdIndex",
      partitionKey: { name: "ownerId", type: dynamodb.AttributeType.STRING },
    });

    const tenantsTable = new dynamodb.Table(this, "TenantsTable", {
      partitionKey: { name: "id", type: dynamodb.AttributeType.STRING },
      billingMode: dynamodb.BillingMode.PAY_PER_REQUEST,
      removalPolicy: cdk.RemovalPolicy.DESTROY, // Change to RETAIN in production
    });

    tenantsTable.addGlobalSecondaryIndex({
      indexName: "PropertyIdIndex",
      partitionKey: { name: "propertyId", type: dynamodb.AttributeType.STRING },
    });

    const leasesTable = new dynamodb.Table(this, "LeasesTable", {
      partitionKey: { name: "id", type: dynamodb.AttributeType.STRING },
      billingMode: dynamodb.BillingMode.PAY_PER_REQUEST,
      removalPolicy: cdk.RemovalPolicy.DESTROY, // Change to RETAIN in production
      timeToLiveAttribute: "expiresAt",
    });

    leasesTable.addGlobalSecondaryIndex({
      indexName: "PropertyIdIndex",
      partitionKey: { name: "propertyId", type: dynamodb.AttributeType.STRING },
    });

    leasesTable.addGlobalSecondaryIndex({
      indexName: "TenantIdIndex",
      partitionKey: { name: "tenantId", type: dynamodb.AttributeType.STRING },
    });

    const maintenanceTable = new dynamodb.Table(this, "MaintenanceTable", {
      partitionKey: { name: "id", type: dynamodb.AttributeType.STRING },
      sortKey: { name: "createdAt", type: dynamodb.AttributeType.STRING },
      billingMode: dynamodb.BillingMode.PAY_PER_REQUEST,
      removalPolicy: cdk.RemovalPolicy.DESTROY, // Change to RETAIN in production
    });

    maintenanceTable.addGlobalSecondaryIndex({
      indexName: "PropertyIdIndex",
      partitionKey: { name: "propertyId", type: dynamodb.AttributeType.STRING },
    });

    maintenanceTable.addGlobalSecondaryIndex({
      indexName: "StatusDateIndex",
      partitionKey: { name: "status", type: dynamodb.AttributeType.STRING },
      sortKey: { name: "createdAt", type: dynamodb.AttributeType.STRING },
    });

    // Create API Gateway
    const api = new apigw.RestApi(this, "SmartPropertyApi", {
      restApiName: "Smart Property Service",
      description: "API for Smart Property Management",
      defaultCorsPreflightOptions: {
        allowOrigins: apigw.Cors.ALL_ORIGINS,
        allowMethods: apigw.Cors.ALL_METHODS,
        statusCode: 200,
      },
    });

    // Create a shared Lambda execution role
    const lambdaRole = new iam.Role(this, "LambdaExecutionRole", {
      assumedBy: new iam.ServicePrincipal("lambda.amazonaws.com"),
      managedPolicies: [
        iam.ManagedPolicy.fromAwsManagedPolicyName(
          "service-role/AWSLambdaBasicExecutionRole"
        ),
      ],
    });

    // Create Clerk Authorizer Lambda
    const clerkAuthorizer = new lambda.Function(this, "ClerkAuthorizer", {
      runtime: lambda.Runtime.NODEJS_18_X,
      handler: "clerkAuthorizer.handler",
      code: lambda.Code.fromAsset(
        path.join(__dirname, "../lambda/authorizers")
      ),
      environment: {
        CLERK_JWKS_URI: clerkJwksUri,
        CLERK_ISSUER: clerkIssuer,
      },
      timeout: cdk.Duration.seconds(10),
      memorySize: 256,
    });

    // Grant API Gateway permission to invoke the authorizer
    clerkAuthorizer.addPermission("AllowAPIGatewayInvoke", {
      principal: new iam.ServicePrincipal("apigateway.amazonaws.com"),
      sourceArn: `arn:aws:execute-api:${this.region}:${this.account}:${api.restApiId}/*`,
    });

    // Create the authorizer using CfnAuthorizer
    const authorizer = new apigw.CfnAuthorizer(this, "ClerkTokenAuthorizer", {
      name: "ClerkTokenAuthorizer",
      restApiId: api.restApiId,
      type: "TOKEN",
      authorizerUri: `arn:aws:apigateway:${this.region}:lambda:path/2015-03-31/functions/${clerkAuthorizer.functionArn}/invocations`,
      identitySource: "method.request.header.Authorization",
      authorizerResultTtlInSeconds: 300, // 5 minutes cache
      authorizerCredentials: lambdaRole.roleArn,
    });

    // Store the authorizer ID for later use
    const authorizerId = authorizer.ref;

    // Apply the authorizer to the API
    api.addGatewayResponse("Default4XXResponse", {
      type: apigw.ResponseType.DEFAULT_4XX,
      responseHeaders: {
        "Access-Control-Allow-Origin": "'*'",
      },
    });

    api.addGatewayResponse("Default5XXResponse", {
      type: apigw.ResponseType.DEFAULT_5XX,
      responseHeaders: {
        "Access-Control-Allow-Origin": "'*'",
      },
    });

    // Grant DynamoDB access to Lambda
    propertiesTable.grantReadWriteData(lambdaRole);
    tenantsTable.grantReadWriteData(lambdaRole);
    leasesTable.grantReadWriteData(lambdaRole);
    maintenanceTable.grantReadWriteData(lambdaRole);

    // Create Lambda functions
    const createPropertyLambda = new NodejsFunction(
      this,
      "CreatePropertyFunction",
      {
        runtime: lambda.Runtime.NODEJS_18_X,
        handler: "handler",
        entry: path.join(
          __dirname,
          "../lambda/handlers/properties/createProperty.ts"
        ),
        environment: {
          PROPERTIES_TABLE_NAME: propertiesTable.tableName,
          CLERK_JWKS_URI: clerkJwksUri,
          CLERK_ISSUER: clerkIssuer,
        },
        role: lambdaRole,
      }
    );

    const getPropertyLambda = new NodejsFunction(this, "GetPropertyFunction", {
      runtime: lambda.Runtime.NODEJS_18_X,
      handler: "handler",
      entry: path.join(
        __dirname,
        "../lambda/handlers/properties/getProperty.ts"
      ),
      environment: {
        PROPERTIES_TABLE_NAME: propertiesTable.tableName,
        CLERK_JWKS_URI: clerkJwksUri,
        CLERK_ISSUER: clerkIssuer,
      },
      role: lambdaRole,
    });

    // API Gateway integration
    const propertiesResource = api.root.addResource("properties");

    // Protected endpoints
    propertiesResource.addMethod(
      "POST",
      new apigw.LambdaIntegration(createPropertyLambda),
      {
        authorizationType: apigw.AuthorizationType.CUSTOM,
        authorizer: {
          authorizerId,
          authorizationType: apigw.AuthorizationType.CUSTOM,
        },
        methodResponses: [
          {
            statusCode: "200",
            responseParameters: {
              "method.response.header.Access-Control-Allow-Origin": true,
            },
          },
        ],
      }
    );

    const propertyResource = propertiesResource.addResource("{id}");
    propertyResource.addMethod(
      "GET",
      new apigw.LambdaIntegration(getPropertyLambda),
      {
        authorizationType: apigw.AuthorizationType.CUSTOM,
        authorizer: {
          authorizerId,
          authorizationType: apigw.AuthorizationType.CUSTOM,
        },
        methodResponses: [
          {
            statusCode: "200",
            responseParameters: {
              "method.response.header.Access-Control-Allow-Origin": true,
            },
          },
        ],
      }
    );

    // Output the API endpoint
    new cdk.CfnOutput(this, "ApiEndpoint", {
      value: api.url,
      description: "Smart Property API Endpoint",
    });

    // Output the table names for reference
    new cdk.CfnOutput(this, "PropertiesTableName", {
      value: propertiesTable.tableName,
      description: "Properties DynamoDB Table Name",
    });

    new cdk.CfnOutput(this, "TenantsTableName", {
      value: tenantsTable.tableName,
      description: "Tenants DynamoDB Table Name",
    });

    new cdk.CfnOutput(this, "LeasesTableName", {
      value: leasesTable.tableName,
      description: "Leases DynamoDB Table Name",
    });

    new cdk.CfnOutput(this, "MaintenanceTableName", {
      value: maintenanceTable.tableName,
      description: "Maintenance DynamoDB Table Name",
    });

    new cdk.CfnOutput(this, "ClerkAuthorizerName", {
      value: authorizerId,
      description: "Name of the Clerk Authorizer",
    });
  }
}
