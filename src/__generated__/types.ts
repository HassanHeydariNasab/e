import { GraphQLResolveInfo, GraphQLScalarType, GraphQLScalarTypeConfig } from 'graphql';
import { Context } from '@resolvers/context';
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
export type RequireFields<T, K extends keyof T> = Omit<T, K> & { [P in K]-?: NonNullable<T[P]> };
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
  Date: any;
  File: any;
  ObjectId: any;
};

export type Category = {
  __typename?: 'Category';
  _id: Scalars['ObjectId'];
  name: Scalars['String'];
  parentId?: Maybe<Scalars['ObjectId']>;
};

export type ConfirmVerificationCodeInput = {
  phoneNumber: Scalars['String'];
  verificationCode: Scalars['String'];
};

export type CreateCategoryInput = {
  name: Scalars['String'];
  parentId?: InputMaybe<Scalars['ObjectId']>;
};

export type Image = {
  __typename?: 'Image';
  _id: Scalars['ObjectId'];
  path: Scalars['String'];
};

export type Mutation = {
  __typename?: 'Mutation';
  confirmVerificationCode: Scalars['String'];
  createCategory: Category;
  sendVerificationCode?: Maybe<Scalars['Boolean']>;
};


export type MutationConfirmVerificationCodeArgs = {
  ConfirmVerificationCodeInput: ConfirmVerificationCodeInput;
};


export type MutationCreateCategoryArgs = {
  input: CreateCategoryInput;
};


export type MutationSendVerificationCodeArgs = {
  SendVerificationCodeInput: SendVerificationCodeInput;
};

export enum Permission {
  Accounting = 'ACCOUNTING',
  Admin = 'ADMIN',
  Product = 'PRODUCT'
}

export type Product = {
  __typename?: 'Product';
  _id: Scalars['ObjectId'];
  createdAt?: Maybe<Scalars['Date']>;
  defaultImage?: Maybe<Image>;
  images?: Maybe<Array<Maybe<Image>>>;
  name: Scalars['String'];
  price: Scalars['Float'];
  productGroupId: Scalars['ObjectId'];
};

export type ProductGroup = {
  __typename?: 'ProductGroup';
  _id: Scalars['ObjectId'];
};

export type Query = {
  __typename?: 'Query';
  categories?: Maybe<Array<Maybe<Category>>>;
  hello?: Maybe<Scalars['String']>;
  me: User;
  user: User;
};


export type QueryUserArgs = {
  UserInput: UserInput;
};

export type SendVerificationCodeInput = {
  phoneNumber: Scalars['String'];
};

export type User = {
  __typename?: 'User';
  _id: Scalars['ObjectId'];
  balance: Scalars['Float'];
  name?: Maybe<Scalars['String']>;
  permissions?: Maybe<Array<Permission>>;
  phoneNumber: Scalars['String'];
};

export type UserInput = {
  _id: Scalars['ObjectId'];
};

export type VerificationCode = {
  __typename?: 'VerificationCode';
  _id: Scalars['ObjectId'];
  phoneNumber: Scalars['String'];
  verificationCode: Scalars['String'];
};

export type WithIndex<TObject> = TObject & Record<string, any>;
export type ResolversObject<TObject> = WithIndex<TObject>;

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
export type ResolversTypes = ResolversObject<{
  Boolean: ResolverTypeWrapper<Scalars['Boolean']>;
  Category: ResolverTypeWrapper<Category>;
  ConfirmVerificationCodeInput: ConfirmVerificationCodeInput;
  CreateCategoryInput: CreateCategoryInput;
  Date: ResolverTypeWrapper<Scalars['Date']>;
  File: ResolverTypeWrapper<Scalars['File']>;
  Float: ResolverTypeWrapper<Scalars['Float']>;
  Image: ResolverTypeWrapper<Image>;
  Mutation: ResolverTypeWrapper<{}>;
  ObjectId: ResolverTypeWrapper<Scalars['ObjectId']>;
  Permission: Permission;
  Product: ResolverTypeWrapper<Product>;
  ProductGroup: ResolverTypeWrapper<ProductGroup>;
  Query: ResolverTypeWrapper<{}>;
  SendVerificationCodeInput: SendVerificationCodeInput;
  String: ResolverTypeWrapper<Scalars['String']>;
  User: ResolverTypeWrapper<User>;
  UserInput: UserInput;
  VerificationCode: ResolverTypeWrapper<VerificationCode>;
}>;

/** Mapping between all available schema types and the resolvers parents */
export type ResolversParentTypes = ResolversObject<{
  Boolean: Scalars['Boolean'];
  Category: Category;
  ConfirmVerificationCodeInput: ConfirmVerificationCodeInput;
  CreateCategoryInput: CreateCategoryInput;
  Date: Scalars['Date'];
  File: Scalars['File'];
  Float: Scalars['Float'];
  Image: Image;
  Mutation: {};
  ObjectId: Scalars['ObjectId'];
  Product: Product;
  ProductGroup: ProductGroup;
  Query: {};
  SendVerificationCodeInput: SendVerificationCodeInput;
  String: Scalars['String'];
  User: User;
  UserInput: UserInput;
  VerificationCode: VerificationCode;
}>;

export type CategoryResolvers<ContextType = Context, ParentType extends ResolversParentTypes['Category'] = ResolversParentTypes['Category']> = ResolversObject<{
  _id?: Resolver<ResolversTypes['ObjectId'], ParentType, ContextType>;
  name?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  parentId?: Resolver<Maybe<ResolversTypes['ObjectId']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export interface DateScalarConfig extends GraphQLScalarTypeConfig<ResolversTypes['Date'], any> {
  name: 'Date';
}

export interface FileScalarConfig extends GraphQLScalarTypeConfig<ResolversTypes['File'], any> {
  name: 'File';
}

export type ImageResolvers<ContextType = Context, ParentType extends ResolversParentTypes['Image'] = ResolversParentTypes['Image']> = ResolversObject<{
  _id?: Resolver<ResolversTypes['ObjectId'], ParentType, ContextType>;
  path?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type MutationResolvers<ContextType = Context, ParentType extends ResolversParentTypes['Mutation'] = ResolversParentTypes['Mutation']> = ResolversObject<{
  confirmVerificationCode?: Resolver<ResolversTypes['String'], ParentType, ContextType, RequireFields<MutationConfirmVerificationCodeArgs, 'ConfirmVerificationCodeInput'>>;
  createCategory?: Resolver<ResolversTypes['Category'], ParentType, ContextType, RequireFields<MutationCreateCategoryArgs, 'input'>>;
  sendVerificationCode?: Resolver<Maybe<ResolversTypes['Boolean']>, ParentType, ContextType, RequireFields<MutationSendVerificationCodeArgs, 'SendVerificationCodeInput'>>;
}>;

export interface ObjectIdScalarConfig extends GraphQLScalarTypeConfig<ResolversTypes['ObjectId'], any> {
  name: 'ObjectId';
}

export type ProductResolvers<ContextType = Context, ParentType extends ResolversParentTypes['Product'] = ResolversParentTypes['Product']> = ResolversObject<{
  _id?: Resolver<ResolversTypes['ObjectId'], ParentType, ContextType>;
  createdAt?: Resolver<Maybe<ResolversTypes['Date']>, ParentType, ContextType>;
  defaultImage?: Resolver<Maybe<ResolversTypes['Image']>, ParentType, ContextType>;
  images?: Resolver<Maybe<Array<Maybe<ResolversTypes['Image']>>>, ParentType, ContextType>;
  name?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  price?: Resolver<ResolversTypes['Float'], ParentType, ContextType>;
  productGroupId?: Resolver<ResolversTypes['ObjectId'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type ProductGroupResolvers<ContextType = Context, ParentType extends ResolversParentTypes['ProductGroup'] = ResolversParentTypes['ProductGroup']> = ResolversObject<{
  _id?: Resolver<ResolversTypes['ObjectId'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type QueryResolvers<ContextType = Context, ParentType extends ResolversParentTypes['Query'] = ResolversParentTypes['Query']> = ResolversObject<{
  categories?: Resolver<Maybe<Array<Maybe<ResolversTypes['Category']>>>, ParentType, ContextType>;
  hello?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  me?: Resolver<ResolversTypes['User'], ParentType, ContextType>;
  user?: Resolver<ResolversTypes['User'], ParentType, ContextType, RequireFields<QueryUserArgs, 'UserInput'>>;
}>;

export type UserResolvers<ContextType = Context, ParentType extends ResolversParentTypes['User'] = ResolversParentTypes['User']> = ResolversObject<{
  _id?: Resolver<ResolversTypes['ObjectId'], ParentType, ContextType>;
  balance?: Resolver<ResolversTypes['Float'], ParentType, ContextType>;
  name?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  permissions?: Resolver<Maybe<Array<ResolversTypes['Permission']>>, ParentType, ContextType>;
  phoneNumber?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type VerificationCodeResolvers<ContextType = Context, ParentType extends ResolversParentTypes['VerificationCode'] = ResolversParentTypes['VerificationCode']> = ResolversObject<{
  _id?: Resolver<ResolversTypes['ObjectId'], ParentType, ContextType>;
  phoneNumber?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  verificationCode?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type Resolvers<ContextType = Context> = ResolversObject<{
  Category?: CategoryResolvers<ContextType>;
  Date?: GraphQLScalarType;
  File?: GraphQLScalarType;
  Image?: ImageResolvers<ContextType>;
  Mutation?: MutationResolvers<ContextType>;
  ObjectId?: GraphQLScalarType;
  Product?: ProductResolvers<ContextType>;
  ProductGroup?: ProductGroupResolvers<ContextType>;
  Query?: QueryResolvers<ContextType>;
  User?: UserResolvers<ContextType>;
  VerificationCode?: VerificationCodeResolvers<ContextType>;
}>;

