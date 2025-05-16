import { ApolloServer } from "apollo-server";
import { typeDefs } from "./schema/typeDefs";
import { resolvers } from "./resolvers";
import { PrismaClient } from "@prisma/client";
import { getClerkAuth } from "./auth";
import { GraphQLContext, AuthUser } from "./context";

const prisma = new PrismaClient();

const server = new ApolloServer({
  typeDefs,
  resolvers,
  context: async ({ req }): Promise<GraphQLContext> => {
    const auth = await getClerkAuth(req);
    let user: AuthUser | undefined = undefined;

    if (auth?.userId && auth?.email) {
      // Always sync user email in DB:
      const dbUser = await prisma.user.upsert({
        where: { id: auth.userId },
        update: { email: auth.email },
        create: {
          id: auth.userId,
          email: auth.email,
          firstName: auth.firstName,
          lastName: auth.lastName,
          role: "USER",
        },
      });
      user = {
        id: dbUser.id,
        role: dbUser.role,
        email: dbUser.email,
        firstName: dbUser.firstName,
        lastName: dbUser.lastName,
      };
    }

    return { prisma, user };
  },
});

server.listen().then(({ url }) => {
  console.log(`🚀 Server ready at ${url}`);
});
