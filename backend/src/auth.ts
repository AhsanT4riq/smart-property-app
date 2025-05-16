import { verifyToken } from "@clerk/backend";

type AuthResult = {
  userId: string;
  firstName: string;
  lastName: string;
  email: string;
  session: string;
};

type CustomClaims = {
  sub: string;
  sid: string;
  firstName: string;
  lastName: string;
  email: string;
};

export async function getClerkAuth(req: {
  headers: { authorization?: string };
}): Promise<AuthResult | null> {
  const authHeader = req.headers.authorization || "";
  const token = authHeader.replace("Bearer ", "").trim();
  if (!token) return null;

  try {
    const payload = (await verifyToken(token, {
      secretKey: process.env.CLERK_SECRET_KEY!,
    })) as unknown as CustomClaims;
    return {
      userId: payload.sub,
      session: payload.sid,
      firstName: payload.firstName,
      lastName: payload.lastName,
      email: payload.email,
    };
  } catch (error) {
    return null;
  }
}
