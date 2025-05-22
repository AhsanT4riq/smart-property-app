import { createRemoteJWKSet, jwtVerify } from "jose";
import { URL } from "url";

export interface ClerkJwtPayload {
  sub: string;
  email?: string;
  email_verified?: boolean;
  phone_number?: string;
  [key: string]: any;
}

class ClerkJwksVerifier {
  private jwksUri: string;
  private issuer: string;
  private audience?: string;
  private jwksClient: ReturnType<typeof createRemoteJWKSet> | null = null;

  constructor(jwksUri: string, issuer: string, audience?: string) {
    if (!jwksUri) throw new Error("JWKS URI is required");
    if (!issuer) throw new Error("Issuer is required");

    this.jwksUri = jwksUri;
    this.issuer = issuer;
    this.audience = audience;
  }

  private async getJwksClient() {
    if (!this.jwksClient) {
      try {
        this.jwksClient = createRemoteJWKSet(new URL(this.jwksUri));
      } catch (error) {
        throw new Error(
          `Failed to create JWKS client: ${
            error instanceof Error ? error.message : String(error)
          }`
        );
      }
    }
    return this.jwksClient;
  }

  /**
   * Verify a JWT token using Clerk's JWKS endpoint
   * @param token The JWT token to verify
   * @returns The decoded token payload if verification succeeds
   * @throws Error if verification fails
   */
  public async verifyToken(token: string): Promise<ClerkJwtPayload> {
    try {
      const client = await this.getJwksClient();
      const result = await jwtVerify(token, client, {
        issuer: this.issuer,
        ...(this.audience && { audience: this.audience }),
        algorithms: ["RS256"],
      });

      // Ensure the payload has the required 'sub' claim
      if (!result.payload.sub) {
        throw new Error("Token is missing required 'sub' claim");
      }

      return result.payload as ClerkJwtPayload;
    } catch (error) {
      const errorMessage =
        error instanceof Error ? error.message : "Token verification failed";
      console.error("Token verification failed:", errorMessage);
      throw new Error(`Invalid token: ${errorMessage}`);
    }
  }
}

// Create a singleton instance
export const clerkJwksVerifier = new ClerkJwksVerifier(
  process.env.CLERK_JWKS_URI!,
  process.env.CLERK_ISSUER!
);
