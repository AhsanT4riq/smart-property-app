import { GraphQLResolveInfo } from 'graphql';
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
export type MakeEmpty<T extends { [key: string]: unknown }, K extends keyof T> = { [_ in K]?: never };
export type Incremental<T> = T | { [P in keyof T]?: P extends ' $fragmentName' | '__typename' ? T[P] : never };
export type RequireFields<T, K extends keyof T> = Omit<T, K> & { [P in K]-?: NonNullable<T[P]> };
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: { input: string; output: string; }
  String: { input: string; output: string; }
  Boolean: { input: boolean; output: boolean; }
  Int: { input: number; output: number; }
  Float: { input: number; output: number; }
};

export type Lease = {
  __typename?: 'Lease';
  endDate: Scalars['String']['output'];
  id: Scalars['ID']['output'];
  maintenanceRequests: Array<MaintenanceRequest>;
  property: Property;
  propertyId: Scalars['ID']['output'];
  rentAmount: Scalars['Float']['output'];
  startDate: Scalars['String']['output'];
  status: Scalars['String']['output'];
  tenant: User;
  tenantId: Scalars['ID']['output'];
};

export type MaintenanceRequest = {
  __typename?: 'MaintenanceRequest';
  createdAt: Scalars['String']['output'];
  description: Scalars['String']['output'];
  id: Scalars['ID']['output'];
  lease: Lease;
  leaseId: Scalars['ID']['output'];
  status: Scalars['String']['output'];
};

export type Mutation = {
  __typename?: 'Mutation';
  createLease: Lease;
  createMaintenanceRequest: MaintenanceRequest;
  createProperty: Property;
  createUser: User;
};


export type MutationCreateLeaseArgs = {
  endDate: Scalars['String']['input'];
  propertyId: Scalars['ID']['input'];
  rentAmount: Scalars['Float']['input'];
  startDate: Scalars['String']['input'];
  status: Scalars['String']['input'];
  tenantId: Scalars['ID']['input'];
};


export type MutationCreateMaintenanceRequestArgs = {
  description: Scalars['String']['input'];
  leaseId: Scalars['ID']['input'];
  status: Scalars['String']['input'];
};


export type MutationCreatePropertyArgs = {
  address: Scalars['String']['input'];
  landlordId: Scalars['ID']['input'];
  name: Scalars['String']['input'];
};


export type MutationCreateUserArgs = {
  email: Scalars['String']['input'];
  firstName: Scalars['String']['input'];
  lastName: Scalars['String']['input'];
  role: Scalars['String']['input'];
};

export type Property = {
  __typename?: 'Property';
  address: Scalars['String']['output'];
  id: Scalars['ID']['output'];
  landlord: User;
  landlordId: Scalars['ID']['output'];
  leases: Array<Lease>;
  name: Scalars['String']['output'];
};

export type Query = {
  __typename?: 'Query';
  hello: Scalars['String']['output'];
  lease?: Maybe<Lease>;
  leases: Array<Lease>;
  maintenanceRequest?: Maybe<MaintenanceRequest>;
  maintenanceRequests: Array<MaintenanceRequest>;
  properties: Array<Property>;
  property?: Maybe<Property>;
  user?: Maybe<User>;
  users: Array<User>;
};


export type QueryLeaseArgs = {
  id: Scalars['ID']['input'];
};


export type QueryMaintenanceRequestArgs = {
  id: Scalars['ID']['input'];
};


export type QueryPropertyArgs = {
  id: Scalars['ID']['input'];
};


export type QueryUserArgs = {
  id: Scalars['ID']['input'];
};

export type User = {
  __typename?: 'User';
  email: Scalars['String']['output'];
  firstName: Scalars['String']['output'];
  id: Scalars['ID']['output'];
  lastName: Scalars['String']['output'];
  leases: Array<Lease>;
  properties: Array<Property>;
  role: Scalars['String']['output'];
};



export type ResolverTypeWrapper<T> = Promise<T> | T;


export type ResolverWithResolve<TResult, TParent, TContext, TArgs> = {
  resolve: ResolverFn<TResult, TParent, TContext, TArgs>;
};
export type Resolver<TResult, TParent = {}, TContext = {}, TArgs = {}> = ResolverFn<TResult, TParent, TContext, TArgs> | ResolverWithResolve<TResult, TParent, TContext, TArgs>;

export type ResolverFn<TResult, TParent, TContext, TArgs> = (
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => Promise<TResult> | TResult;

export type SubscriptionSubscribeFn<TResult, TParent, TContext, TArgs> = (
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => AsyncIterable<TResult> | Promise<AsyncIterable<TResult>>;

export type SubscriptionResolveFn<TResult, TParent, TContext, TArgs> = (
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => TResult | Promise<TResult>;

export interface SubscriptionSubscriberObject<TResult, TKey extends string, TParent, TContext, TArgs> {
  subscribe: SubscriptionSubscribeFn<{ [key in TKey]: TResult }, TParent, TContext, TArgs>;
  resolve?: SubscriptionResolveFn<TResult, { [key in TKey]: TResult }, TContext, TArgs>;
}

export interface SubscriptionResolverObject<TResult, TParent, TContext, TArgs> {
  subscribe: SubscriptionSubscribeFn<any, TParent, TContext, TArgs>;
  resolve: SubscriptionResolveFn<TResult, any, TContext, TArgs>;
}

export type SubscriptionObject<TResult, TKey extends string, TParent, TContext, TArgs> =
  | SubscriptionSubscriberObject<TResult, TKey, TParent, TContext, TArgs>
  | SubscriptionResolverObject<TResult, TParent, TContext, TArgs>;

export type SubscriptionResolver<TResult, TKey extends string, TParent = {}, TContext = {}, TArgs = {}> =
  | ((...args: any[]) => SubscriptionObject<TResult, TKey, TParent, TContext, TArgs>)
  | SubscriptionObject<TResult, TKey, TParent, TContext, TArgs>;

export type TypeResolveFn<TTypes, TParent = {}, TContext = {}> = (
  parent: TParent,
  context: TContext,
  info: GraphQLResolveInfo
) => Maybe<TTypes> | Promise<Maybe<TTypes>>;

export type IsTypeOfResolverFn<T = {}, TContext = {}> = (obj: T, context: TContext, info: GraphQLResolveInfo) => boolean | Promise<boolean>;

export type NextResolverFn<T> = () => Promise<T>;

export type DirectiveResolverFn<TResult = {}, TParent = {}, TContext = {}, TArgs = {}> = (
  next: NextResolverFn<TResult>,
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => TResult | Promise<TResult>;



/** Mapping between all available schema types and the resolvers types */
export type ResolversTypes = {
  Boolean: ResolverTypeWrapper<Scalars['Boolean']['output']>;
  Float: ResolverTypeWrapper<Scalars['Float']['output']>;
  ID: ResolverTypeWrapper<Scalars['ID']['output']>;
  Lease: ResolverTypeWrapper<Lease>;
  MaintenanceRequest: ResolverTypeWrapper<MaintenanceRequest>;
  Mutation: ResolverTypeWrapper<{}>;
  Property: ResolverTypeWrapper<Property>;
  Query: ResolverTypeWrapper<{}>;
  String: ResolverTypeWrapper<Scalars['String']['output']>;
  User: ResolverTypeWrapper<User>;
};

/** Mapping between all available schema types and the resolvers parents */
export type ResolversParentTypes = {
  Boolean: Scalars['Boolean']['output'];
  Float: Scalars['Float']['output'];
  ID: Scalars['ID']['output'];
  Lease: Lease;
  MaintenanceRequest: MaintenanceRequest;
  Mutation: {};
  Property: Property;
  Query: {};
  String: Scalars['String']['output'];
  User: User;
};

export type LeaseResolvers<ContextType = any, ParentType extends ResolversParentTypes['Lease'] = ResolversParentTypes['Lease']> = {
  endDate?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  maintenanceRequests?: Resolver<Array<ResolversTypes['MaintenanceRequest']>, ParentType, ContextType>;
  property?: Resolver<ResolversTypes['Property'], ParentType, ContextType>;
  propertyId?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  rentAmount?: Resolver<ResolversTypes['Float'], ParentType, ContextType>;
  startDate?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  status?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  tenant?: Resolver<ResolversTypes['User'], ParentType, ContextType>;
  tenantId?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type MaintenanceRequestResolvers<ContextType = any, ParentType extends ResolversParentTypes['MaintenanceRequest'] = ResolversParentTypes['MaintenanceRequest']> = {
  createdAt?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  description?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  lease?: Resolver<ResolversTypes['Lease'], ParentType, ContextType>;
  leaseId?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  status?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type MutationResolvers<ContextType = any, ParentType extends ResolversParentTypes['Mutation'] = ResolversParentTypes['Mutation']> = {
  createLease?: Resolver<ResolversTypes['Lease'], ParentType, ContextType, RequireFields<MutationCreateLeaseArgs, 'endDate' | 'propertyId' | 'rentAmount' | 'startDate' | 'status' | 'tenantId'>>;
  createMaintenanceRequest?: Resolver<ResolversTypes['MaintenanceRequest'], ParentType, ContextType, RequireFields<MutationCreateMaintenanceRequestArgs, 'description' | 'leaseId' | 'status'>>;
  createProperty?: Resolver<ResolversTypes['Property'], ParentType, ContextType, RequireFields<MutationCreatePropertyArgs, 'address' | 'landlordId' | 'name'>>;
  createUser?: Resolver<ResolversTypes['User'], ParentType, ContextType, RequireFields<MutationCreateUserArgs, 'email' | 'firstName' | 'lastName' | 'role'>>;
};

export type PropertyResolvers<ContextType = any, ParentType extends ResolversParentTypes['Property'] = ResolversParentTypes['Property']> = {
  address?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  landlord?: Resolver<ResolversTypes['User'], ParentType, ContextType>;
  landlordId?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  leases?: Resolver<Array<ResolversTypes['Lease']>, ParentType, ContextType>;
  name?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type QueryResolvers<ContextType = any, ParentType extends ResolversParentTypes['Query'] = ResolversParentTypes['Query']> = {
  hello?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  lease?: Resolver<Maybe<ResolversTypes['Lease']>, ParentType, ContextType, RequireFields<QueryLeaseArgs, 'id'>>;
  leases?: Resolver<Array<ResolversTypes['Lease']>, ParentType, ContextType>;
  maintenanceRequest?: Resolver<Maybe<ResolversTypes['MaintenanceRequest']>, ParentType, ContextType, RequireFields<QueryMaintenanceRequestArgs, 'id'>>;
  maintenanceRequests?: Resolver<Array<ResolversTypes['MaintenanceRequest']>, ParentType, ContextType>;
  properties?: Resolver<Array<ResolversTypes['Property']>, ParentType, ContextType>;
  property?: Resolver<Maybe<ResolversTypes['Property']>, ParentType, ContextType, RequireFields<QueryPropertyArgs, 'id'>>;
  user?: Resolver<Maybe<ResolversTypes['User']>, ParentType, ContextType, RequireFields<QueryUserArgs, 'id'>>;
  users?: Resolver<Array<ResolversTypes['User']>, ParentType, ContextType>;
};

export type UserResolvers<ContextType = any, ParentType extends ResolversParentTypes['User'] = ResolversParentTypes['User']> = {
  email?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  firstName?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  lastName?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  leases?: Resolver<Array<ResolversTypes['Lease']>, ParentType, ContextType>;
  properties?: Resolver<Array<ResolversTypes['Property']>, ParentType, ContextType>;
  role?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type Resolvers<ContextType = any> = {
  Lease?: LeaseResolvers<ContextType>;
  MaintenanceRequest?: MaintenanceRequestResolvers<ContextType>;
  Mutation?: MutationResolvers<ContextType>;
  Property?: PropertyResolvers<ContextType>;
  Query?: QueryResolvers<ContextType>;
  User?: UserResolvers<ContextType>;
};

