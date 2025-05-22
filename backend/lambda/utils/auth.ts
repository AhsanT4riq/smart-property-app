import { APIGatewayProxyEvent } from "aws-lambda";

type UserContext = {
  userId: string;
  email?: string;
  [key: string]: any;
};

export const getAuthUser = (
  event: APIGatewayProxyEvent
): UserContext | null => {
  // For API Gateway Lambda Authorizer
  const authContext = event.requestContext?.authorizer;
  if (authContext) {
    return {
      userId: authContext.userId,
      email: authContext.email,
      ...authContext,
    };
  }

  // For direct Lambda invocation or other cases
  return null;
};

export const requireAuth = (event: APIGatewayProxyEvent): UserContext => {
  const user = getAuthUser(event);
  if (!user) {
    throw new Error("Unauthorized: No authentication provided");
  }
  return user;
};
