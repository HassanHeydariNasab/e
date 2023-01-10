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
  ObjectId: any;
};

export type AttributeKey = {
  __typename?: 'AttributeKey';
  kind: AttributeKind;
  name: Scalars['String'];
};

export type AttributeKeyInput = {
  kind: AttributeKind;
  name: Scalars['String'];
};

export enum AttributeKind {
  Number = 'NUMBER',
  String = 'STRING'
}

export type AttributeValue = {
  __typename?: 'AttributeValue';
  name: Scalars['String'];
  value: Scalars['String'];
};

export type AttributeValueInput = {
  name: Scalars['String'];
  value: Scalars['String'];
};

export type Category = {
  __typename?: 'Category';
  _id: Scalars['ObjectId'];
  attributeKeys: Array<AttributeKey>;
  isHidden?: Maybe<Scalars['Boolean']>;
  name: Scalars['String'];
  parentId?: Maybe<Scalars['ObjectId']>;
};

export type ConfirmVerificationCodeInput = {
  phoneNumber: Scalars['String'];
  verificationCode: Scalars['String'];
};

export type CreateCategoryInput = {
  attributeKeys: Array<AttributeKeyInput>;
  name: Scalars['String'];
  parentId?: InputMaybe<Scalars['ObjectId']>;
};

export type CreateProductGroupInput = {
  categoryId: Scalars['ObjectId'];
  name: Scalars['String'];
};

export type CreateProductInput = {
  attributeValues: Array<AttributeValueInput>;
  categoryId: Scalars['ObjectId'];
  defaultImageId: Scalars['ObjectId'];
  imageIds: Array<Scalars['ObjectId']>;
  name: Scalars['String'];
  price: Scalars['Float'];
  productGroupId: Scalars['ObjectId'];
};

export type Image = {
  __typename?: 'Image';
  _id: Scalars['ObjectId'];
  name?: Maybe<Scalars['String']>;
};

export type Mutation = {
  __typename?: 'Mutation';
  confirmVerificationCode: Scalars['String'];
  createCategory: Category;
  createProduct: Product;
  createProductGroup: ProductGroup;
  sendVerificationCode?: Maybe<Scalars['Boolean']>;
};


export type MutationConfirmVerificationCodeArgs = {
  ConfirmVerificationCodeInput: ConfirmVerificationCodeInput;
};


export type MutationCreateCategoryArgs = {
  input: CreateCategoryInput;
};


export type MutationCreateProductArgs = {
  input: CreateProductInput;
};


export type MutationCreateProductGroupArgs = {
  input: CreateProductGroupInput;
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
  attributeValues: Array<AttributeValue>;
  categoryId: Scalars['ObjectId'];
  createdAt?: Maybe<Scalars['Date']>;
  defaultImagePath: Scalars['String'];
  imageIds: Array<Scalars['ObjectId']>;
  isHidden?: Maybe<Scalars['Boolean']>;
  name: Scalars['String'];
  price: Scalars['Float'];
  productGroupId: Scalars['ObjectId'];
};

export type ProductGroup = {
  __typename?: 'ProductGroup';
  _id: Scalars['ObjectId'];
  categoryId: Scalars['ObjectId'];
  createdAt?: Maybe<Scalars['Date']>;
  isHidden?: Maybe<Scalars['Boolean']>;
  name: Scalars['String'];
};

export type ProductGroupsFilter = {
  categoryId?: InputMaybe<Scalars['ObjectId']>;
  isHidden?: InputMaybe<Scalars['Boolean']>;
};

export type ProductGroupsOptions = {
  limit?: InputMaybe<Scalars['Int']>;
  skip?: InputMaybe<Scalars['Int']>;
  sort?: InputMaybe<ProductGroupsSort>;
};

export type ProductGroupsSort = {
  createdAt?: InputMaybe<Scalars['Int']>;
  name?: InputMaybe<Scalars['Int']>;
};

export type ProductsFilter = {
  attributeValues?: InputMaybe<Array<AttributeValueInput>>;
  categoryId?: InputMaybe<Scalars['ObjectId']>;
  isHidden?: InputMaybe<Scalars['Boolean']>;
  productGroupId?: InputMaybe<Scalars['ObjectId']>;
};

export type ProductsOptions = {
  limit?: InputMaybe<Scalars['Int']>;
  skip?: InputMaybe<Scalars['Int']>;
  sort?: InputMaybe<ProductsSort>;
};

export type ProductsSort = {
  createdAt?: InputMaybe<Scalars['Int']>;
  price?: InputMaybe<Scalars['Int']>;
};

export type Query = {
  __typename?: 'Query';
  categories: Array<Category>;
  hello?: Maybe<Scalars['String']>;
  me: User;
  productGroups: Array<ProductGroup>;
  products: Array<Product>;
  user: User;
};


export type QueryProductGroupsArgs = {
  filter?: InputMaybe<ProductGroupsFilter>;
  options?: InputMaybe<ProductGroupsOptions>;
};


export type QueryProductsArgs = {
  filter?: InputMaybe<ProductsFilter>;
  options?: InputMaybe<ProductsOptions>;
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
  AttributeKey: ResolverTypeWrapper<AttributeKey>;
  AttributeKeyInput: AttributeKeyInput;
  AttributeKind: AttributeKind;
  AttributeValue: ResolverTypeWrapper<AttributeValue>;
  AttributeValueInput: AttributeValueInput;
  Boolean: ResolverTypeWrapper<Scalars['Boolean']>;
  Category: ResolverTypeWrapper<Category>;
  ConfirmVerificationCodeInput: ConfirmVerificationCodeInput;
  CreateCategoryInput: CreateCategoryInput;
  CreateProductGroupInput: CreateProductGroupInput;
  CreateProductInput: CreateProductInput;
  Date: ResolverTypeWrapper<Scalars['Date']>;
  Float: ResolverTypeWrapper<Scalars['Float']>;
  Image: ResolverTypeWrapper<Image>;
  Int: ResolverTypeWrapper<Scalars['Int']>;
  Mutation: ResolverTypeWrapper<{}>;
  ObjectId: ResolverTypeWrapper<Scalars['ObjectId']>;
  Permission: Permission;
  Product: ResolverTypeWrapper<Product>;
  ProductGroup: ResolverTypeWrapper<ProductGroup>;
  ProductGroupsFilter: ProductGroupsFilter;
  ProductGroupsOptions: ProductGroupsOptions;
  ProductGroupsSort: ProductGroupsSort;
  ProductsFilter: ProductsFilter;
  ProductsOptions: ProductsOptions;
  ProductsSort: ProductsSort;
  Query: ResolverTypeWrapper<{}>;
  SendVerificationCodeInput: SendVerificationCodeInput;
  String: ResolverTypeWrapper<Scalars['String']>;
  User: ResolverTypeWrapper<User>;
  UserInput: UserInput;
  VerificationCode: ResolverTypeWrapper<VerificationCode>;
}>;

/** Mapping between all available schema types and the resolvers parents */
export type ResolversParentTypes = ResolversObject<{
  AttributeKey: AttributeKey;
  AttributeKeyInput: AttributeKeyInput;
  AttributeValue: AttributeValue;
  AttributeValueInput: AttributeValueInput;
  Boolean: Scalars['Boolean'];
  Category: Category;
  ConfirmVerificationCodeInput: ConfirmVerificationCodeInput;
  CreateCategoryInput: CreateCategoryInput;
  CreateProductGroupInput: CreateProductGroupInput;
  CreateProductInput: CreateProductInput;
  Date: Scalars['Date'];
  Float: Scalars['Float'];
  Image: Image;
  Int: Scalars['Int'];
  Mutation: {};
  ObjectId: Scalars['ObjectId'];
  Product: Product;
  ProductGroup: ProductGroup;
  ProductGroupsFilter: ProductGroupsFilter;
  ProductGroupsOptions: ProductGroupsOptions;
  ProductGroupsSort: ProductGroupsSort;
  ProductsFilter: ProductsFilter;
  ProductsOptions: ProductsOptions;
  ProductsSort: ProductsSort;
  Query: {};
  SendVerificationCodeInput: SendVerificationCodeInput;
  String: Scalars['String'];
  User: User;
  UserInput: UserInput;
  VerificationCode: VerificationCode;
}>;

export type AttributeKeyResolvers<ContextType = Context, ParentType extends ResolversParentTypes['AttributeKey'] = ResolversParentTypes['AttributeKey']> = ResolversObject<{
  kind?: Resolver<ResolversTypes['AttributeKind'], ParentType, ContextType>;
  name?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type AttributeValueResolvers<ContextType = Context, ParentType extends ResolversParentTypes['AttributeValue'] = ResolversParentTypes['AttributeValue']> = ResolversObject<{
  name?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  value?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type CategoryResolvers<ContextType = Context, ParentType extends ResolversParentTypes['Category'] = ResolversParentTypes['Category']> = ResolversObject<{
  _id?: Resolver<ResolversTypes['ObjectId'], ParentType, ContextType>;
  attributeKeys?: Resolver<Array<ResolversTypes['AttributeKey']>, ParentType, ContextType>;
  isHidden?: Resolver<Maybe<ResolversTypes['Boolean']>, ParentType, ContextType>;
  name?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  parentId?: Resolver<Maybe<ResolversTypes['ObjectId']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export interface DateScalarConfig extends GraphQLScalarTypeConfig<ResolversTypes['Date'], any> {
  name: 'Date';
}

export type ImageResolvers<ContextType = Context, ParentType extends ResolversParentTypes['Image'] = ResolversParentTypes['Image']> = ResolversObject<{
  _id?: Resolver<ResolversTypes['ObjectId'], ParentType, ContextType>;
  name?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type MutationResolvers<ContextType = Context, ParentType extends ResolversParentTypes['Mutation'] = ResolversParentTypes['Mutation']> = ResolversObject<{
  confirmVerificationCode?: Resolver<ResolversTypes['String'], ParentType, ContextType, RequireFields<MutationConfirmVerificationCodeArgs, 'ConfirmVerificationCodeInput'>>;
  createCategory?: Resolver<ResolversTypes['Category'], ParentType, ContextType, RequireFields<MutationCreateCategoryArgs, 'input'>>;
  createProduct?: Resolver<ResolversTypes['Product'], ParentType, ContextType, RequireFields<MutationCreateProductArgs, 'input'>>;
  createProductGroup?: Resolver<ResolversTypes['ProductGroup'], ParentType, ContextType, RequireFields<MutationCreateProductGroupArgs, 'input'>>;
  sendVerificationCode?: Resolver<Maybe<ResolversTypes['Boolean']>, ParentType, ContextType, RequireFields<MutationSendVerificationCodeArgs, 'SendVerificationCodeInput'>>;
}>;

export interface ObjectIdScalarConfig extends GraphQLScalarTypeConfig<ResolversTypes['ObjectId'], any> {
  name: 'ObjectId';
}

export type ProductResolvers<ContextType = Context, ParentType extends ResolversParentTypes['Product'] = ResolversParentTypes['Product']> = ResolversObject<{
  _id?: Resolver<ResolversTypes['ObjectId'], ParentType, ContextType>;
  attributeValues?: Resolver<Array<ResolversTypes['AttributeValue']>, ParentType, ContextType>;
  categoryId?: Resolver<ResolversTypes['ObjectId'], ParentType, ContextType>;
  createdAt?: Resolver<Maybe<ResolversTypes['Date']>, ParentType, ContextType>;
  defaultImagePath?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  imageIds?: Resolver<Array<ResolversTypes['ObjectId']>, ParentType, ContextType>;
  isHidden?: Resolver<Maybe<ResolversTypes['Boolean']>, ParentType, ContextType>;
  name?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  price?: Resolver<ResolversTypes['Float'], ParentType, ContextType>;
  productGroupId?: Resolver<ResolversTypes['ObjectId'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type ProductGroupResolvers<ContextType = Context, ParentType extends ResolversParentTypes['ProductGroup'] = ResolversParentTypes['ProductGroup']> = ResolversObject<{
  _id?: Resolver<ResolversTypes['ObjectId'], ParentType, ContextType>;
  categoryId?: Resolver<ResolversTypes['ObjectId'], ParentType, ContextType>;
  createdAt?: Resolver<Maybe<ResolversTypes['Date']>, ParentType, ContextType>;
  isHidden?: Resolver<Maybe<ResolversTypes['Boolean']>, ParentType, ContextType>;
  name?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type QueryResolvers<ContextType = Context, ParentType extends ResolversParentTypes['Query'] = ResolversParentTypes['Query']> = ResolversObject<{
  categories?: Resolver<Array<ResolversTypes['Category']>, ParentType, ContextType>;
  hello?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  me?: Resolver<ResolversTypes['User'], ParentType, ContextType>;
  productGroups?: Resolver<Array<ResolversTypes['ProductGroup']>, ParentType, ContextType, Partial<QueryProductGroupsArgs>>;
  products?: Resolver<Array<ResolversTypes['Product']>, ParentType, ContextType, Partial<QueryProductsArgs>>;
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
  AttributeKey?: AttributeKeyResolvers<ContextType>;
  AttributeValue?: AttributeValueResolvers<ContextType>;
  Category?: CategoryResolvers<ContextType>;
  Date?: GraphQLScalarType;
  Image?: ImageResolvers<ContextType>;
  Mutation?: MutationResolvers<ContextType>;
  ObjectId?: GraphQLScalarType;
  Product?: ProductResolvers<ContextType>;
  ProductGroup?: ProductGroupResolvers<ContextType>;
  Query?: QueryResolvers<ContextType>;
  User?: UserResolvers<ContextType>;
  VerificationCode?: VerificationCodeResolvers<ContextType>;
}>;

