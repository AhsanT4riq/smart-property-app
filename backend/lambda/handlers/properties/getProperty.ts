import { DynamoDBClient } from "@aws-sdk/client-dynamodb";
import { DynamoDBDocumentClient, GetCommand } from "@aws-sdk/lib-dynamodb";
import { APIGatewayProxyEvent } from "aws-lambda";
import {
  successResponse,
  notFound,
  errorResponse,
  forbidden,
  unauthorized,
} from "../../utils/apiResponse";
import { requireAuth } from "../../utils/auth";

const client = new DynamoDBClient({});
const docClient = DynamoDBDocumentClient.from(client);

export const handler = async (event: APIGatewayProxyEvent) => {
  // Require authentication and get user context
  const user = requireAuth(event);

  const propertyId = event.pathParameters?.id;

  if (!propertyId) {
    return errorResponse("Property ID is required", 400);
  }

  try {
    const command = new GetCommand({
      TableName: process.env.PROPERTIES_TABLE_NAME,
      Key: { id: propertyId },
    });

    const { Item: property } = await docClient.send(command);

    if (!property) {
      return notFound("Property not found");
    }

    // Check if the authenticated user is the owner of the property
    if (property.ownerId !== user.userId) {
      return forbidden("You do not have permission to access this property");
    }

    return successResponse({ property });
  } catch (error: any) {
    if (error.message === "Unauthorized: No authentication provided") {
      return unauthorized("Authentication required");
    }
    console.error("Error fetching property:", error);
    return errorResponse("Failed to fetch property", 500, error);
  }
};
