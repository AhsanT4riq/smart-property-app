import { PrismaClient } from "@prisma/client";

export type AuthUser = {
  id: string;
  role: string;
  firstName: string;
  lastName: string;
  email: string;
};

export type GraphQLContext = {
  prisma: PrismaClient;
  user?: AuthUser;
};
