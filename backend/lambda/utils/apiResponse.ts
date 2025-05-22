import { APIGatewayProxyResult } from "aws-lambda";

export const successResponse = (
  data: any,
  statusCode = 200
): APIGatewayProxyResult => ({
  statusCode,
  headers: {
    "Content-Type": "application/json",
    "Access-Control-Allow-Origin": "*",
  },
  body: JSON.stringify({
    success: true,
    data,
  }),
});

export const errorResponse = (
  message: string,
  statusCode = 500,
  error?: any
): APIGatewayProxyResult => {
  console.error(`Error: ${message}`, error);
  return {
    statusCode,
    headers: {
      "Content-Type": "application/json",
      "Access-Control-Allow-Origin": "*",
    },
    body: JSON.stringify({
      success: false,
      message,
      error: error?.message || error,
    }),
  };
};

export const badRequest = (message: string): APIGatewayProxyResult =>
  errorResponse(message, 400);

export const notFound = (
  message = "Resource not found"
): APIGatewayProxyResult => errorResponse(message, 404);

export const unauthorized = (message = "Unauthorized"): APIGatewayProxyResult =>
  errorResponse(message, 401);

export const forbidden = (message = "Forbidden"): APIGatewayProxyResult =>
  errorResponse(message, 403);
