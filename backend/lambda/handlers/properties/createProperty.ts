import { DynamoDBClient } from "@aws-sdk/client-dynamodb";
import { DynamoDBDocumentClient, PutCommand } from "@aws-sdk/lib-dynamodb";
import { APIGatewayProxyEvent, APIGatewayProxyResult } from "aws-lambda";
import { v4 as uuidv4 } from "uuid";
import {
  successResponse,
  badRequest,
  errorResponse,
} from "../../utils/apiResponse";
import { requireAuth } from "../../utils/auth";

const client = new DynamoDBClient({});
const docClient = DynamoDBDocumentClient.from(client);

export const handler = async (
  event: APIGatewayProxyEvent
): Promise<APIGatewayProxyResult> => {
  // Require authentication and get user context
  const user = requireAuth(event);

  if (!event.body) {
    return badRequest("Request body is required");
  }

  try {
    const propertyData = JSON.parse(event.body);
    const propertyId = uuidv4();
    const timestamp = new Date().toISOString();

    const newProperty = {
      id: propertyId,
      ownerId: user.userId,
      createdAt: timestamp,
      updatedAt: timestamp,
      ...propertyData,
    };

    const command = new PutCommand({
      TableName: process.env.PROPERTIES_TABLE_NAME,
      Item: newProperty,
    });

    await docClient.send(command);

    return successResponse({
      message: "Property created successfully",
      data: newProperty,
    });
  } catch (error) {
    console.error("Error creating property:", error);
    return errorResponse("Failed to create property", 500, error);
  }
};
