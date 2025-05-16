import { Resolvers } from "../types/graphql";

function requireAuth(context: any) {
  if (!context.user) {
    throw new Error("Not authenticated");
  }
}

export const resolvers: Resolvers = {
  Query: {
    hello: () => "Hello, Smart Property App!",

    // Users
    users: (_parent, _args, context) => {
      requireAuth(context);
      return context.prisma.user.findMany();
    },
    user: (_parent, args, context) => {
      requireAuth(context);
      return context.prisma.user.findUnique({ where: { id: args.id } });
    },

    // Properties
    properties: (_parent, _args, context) => {
      requireAuth(context);
      return context.prisma.property.findMany();
    },
    property: (_parent, args, context) => {
      requireAuth(context);
      return context.prisma.property.findUnique({ where: { id: args.id } });
    },

    // Leases
    leases: (_parent, _args, context) => {
      requireAuth(context);
      return context.prisma.lease.findMany();
    },
    lease: (_parent, args, context) => {
      requireAuth(context);
      return context.prisma.lease.findUnique({ where: { id: args.id } });
    },

    // Maintenance Requests
    maintenanceRequests: (_parent, _args, context) => {
      requireAuth(context);
      return context.prisma.maintenanceRequest.findMany();
    },
    maintenanceRequest: (_parent, args, context) => {
      requireAuth(context);
      return context.prisma.maintenanceRequest.findUnique({
        where: { id: args.id },
      });
    },
  },

  Mutation: {
    // User
    createUser: (_parent, args, context) => {
      requireAuth(context);
      return context.prisma.user.create({
        data: {
          firstName: args.firstName,
          lastName: args.lastName,
          email: args.email,
          role: args.role,
        },
      });
    },

    // Property
    createProperty: (_parent, args, context) => {
      requireAuth(context);
      return context.prisma.property.create({
        data: {
          name: args.name,
          address: args.address,
          landlordId: args.landlordId,
        },
      });
    },

    // Lease
    createLease: (_parent, args, context) => {
      requireAuth(context);
      return context.prisma.lease.create({
        data: {
          propertyId: args.propertyId,
          tenantId: args.tenantId,
          startDate: new Date(args.startDate),
          endDate: new Date(args.endDate),
          rentAmount: args.rentAmount,
          status: args.status,
        },
      });
    },

    // MaintenanceRequest
    createMaintenanceRequest: (_parent, args, context) => {
      requireAuth(context);
      return context.prisma.maintenanceRequest.create({
        data: {
          leaseId: args.leaseId,
          description: args.description,
          status: args.status,
        },
      });
    },
  },

  // Nested resolvers
  User: {
    properties: (parent, _args, context) => {
      requireAuth(context);
      return context.prisma.property.findMany({
        where: { landlordId: parent.id },
      });
    },
    leases: (parent, _args, context) => {
      requireAuth(context);
      return context.prisma.lease.findMany({ where: { tenantId: parent.id } });
    },
  },
  Property: {
    landlord: (parent, _args, context) => {
      requireAuth(context);
      return context.prisma.user.findUnique({
        where: { id: parent.landlordId },
      });
    },
    leases: (parent, _args, context) => {
      requireAuth(context);
      return context.prisma.lease.findMany({
        where: { propertyId: parent.id },
      });
    },
  },
  Lease: {
    property: (parent, _args, context) => {
      requireAuth(context);
      return context.prisma.property.findUnique({
        where: { id: parent.propertyId },
      });
    },
    tenant: (parent, _args, context) => {
      requireAuth(context);
      return context.prisma.user.findUnique({ where: { id: parent.tenantId } });
    },
    maintenanceRequests: (parent, _args, context) => {
      requireAuth(context);
      return context.prisma.maintenanceRequest.findMany({
        where: { leaseId: parent.id },
      });
    },
  },
  MaintenanceRequest: {
    lease: (parent, _args, context) => {
      requireAuth(context);
      return context.prisma.lease.findUnique({ where: { id: parent.leaseId } });
    },
  },
};
