import {
  APIGatewayTokenAuthorizerEvent,
  APIGatewayAuthorizerResult,
  APIGatewayAuthorizerResultContext,
} from "aws-lambda";
import { clerkJwksVerifier } from "../utils/clerkJwks";

const generatePolicy = (
  principalId: string,
  effect: "Allow" | "Deny",
  resource: string,
  context?: APIGatewayAuthorizerResultContext
): APIGatewayAuthorizerResult => ({
  principalId,
  policyDocument: {
    Version: "2012-10-17",
    Statement: [
      {
        Action: "execute-api:Invoke",
        Effect: effect,
        Resource: resource,
      },
    ],
  },
  context,
});

export const handler = async (
  event: APIGatewayTokenAuthorizerEvent
): Promise<APIGatewayAuthorizerResult> => {
  console.log("Received event:", JSON.stringify(event, null, 2));

  try {
    // Extract token from Authorization header
    const token = event.authorizationToken?.split(" ")[1];
    if (!token) {
      console.error("No token provided");
      return generatePolicy("user", "Deny", event.methodArn);
    }

    try {
      // Verify the token using the Clerk JWKS verifier
      const payload = await clerkJwksVerifier.verifyToken(token);
      console.log(
        "Token verified successfully. Payload:",
        JSON.stringify(payload, null, 2)
      );

      // Prepare the context with user information
      const context: APIGatewayAuthorizerResultContext = {
        userId: payload.sub,
        email: payload.email || "",
        // Include additional claims that might be useful for your application
        ...(payload.email_verified && {
          email_verified: payload.email_verified,
        }),
        ...(payload.phone_number && { phone_number: payload.phone_number }),
        // Add any custom claims from your JWT
        ...(payload.metadata && { metadata: JSON.stringify(payload.metadata) }),
      };

      return generatePolicy(payload.sub, "Allow", event.methodArn, context);
    } catch (verifyError) {
      console.error("Token verification failed:", verifyError);
      return generatePolicy("user", "Deny", event.methodArn);
    }
  } catch (error) {
    console.error("Error processing request:", error);
    return generatePolicy("user", "Deny", event.methodArn);
  }
};
