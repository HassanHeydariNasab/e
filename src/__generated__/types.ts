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

export type AddToCartInput = {
  productId: Scalars['ObjectId'];
  quantity: Scalars['Int'];
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
  quantity: Scalars['Int'];
};

export type ExchangeRate = ExchangeRateModel & {
  __typename?: 'ExchangeRate';
  _id: Scalars['ObjectId'];
  name: Scalars['String'];
  rate: Scalars['Float'];
  updatedAt?: Maybe<Scalars['Date']>;
};

export type ExchangeRateModel = {
  _id: Scalars['ObjectId'];
  name: Scalars['String'];
  rate: Scalars['Float'];
  updatedAt?: Maybe<Scalars['Date']>;
};

export type Image = {
  __typename?: 'Image';
  _id: Scalars['ObjectId'];
  name?: Maybe<Scalars['String']>;
};

export type Invoice = {
  __typename?: 'Invoice';
  _id: Scalars['ObjectId'];
  createdAt: Scalars['Date'];
  orderId: Scalars['ObjectId'];
  paid?: Maybe<Scalars['Int']>;
  paidAt?: Maybe<Scalars['Date']>;
  paymentMethod?: Maybe<PaymentMethod>;
  paymentMethodId?: Maybe<Scalars['ObjectId']>;
  paymentMethodSnapshot?: Maybe<PaymentMethod>;
  price: Scalars['Float'];
};

export type Mutation = {
  __typename?: 'Mutation';
  addToCart: Order;
  confirmVerificationCode: Scalars['String'];
  createCategory: Category;
  createProduct: Product;
  createProductGroup: ProductGroup;
  removeFromCart: Order;
  sendVerificationCode?: Maybe<Scalars['Boolean']>;
  updateOrderItemQuantity: Order;
};


export type MutationAddToCartArgs = {
  input: AddToCartInput;
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


export type MutationRemoveFromCartArgs = {
  input: RemoveFromCartInput;
};


export type MutationSendVerificationCodeArgs = {
  SendVerificationCodeInput: SendVerificationCodeInput;
};


export type MutationUpdateOrderItemQuantityArgs = {
  input: UpdateOrderItemQuantityInput;
};

export type Order = OrderModel & {
  __typename?: 'Order';
  _id: Scalars['ObjectId'];
  orderItems: Array<OrderItem>;
  orderShipping?: Maybe<OrderShipping>;
  orderShippingId?: Maybe<Scalars['ObjectId']>;
  placedAt?: Maybe<Scalars['Date']>;
  price: Scalars['Float'];
  status: OrderStatus;
  user?: Maybe<User>;
  userId: Scalars['ObjectId'];
};

export type OrderItem = OrderItemModel & {
  __typename?: 'OrderItem';
  _id: Scalars['ObjectId'];
  orderId: Scalars['ObjectId'];
  product?: Maybe<Product>;
  productId: Scalars['ObjectId'];
  productSnapshot: Product;
  quantity: Scalars['Int'];
};

export type OrderItemModel = {
  _id: Scalars['ObjectId'];
  orderId: Scalars['ObjectId'];
  productId: Scalars['ObjectId'];
  productSnapshot: Product;
  quantity: Scalars['Int'];
};

export type OrderModel = {
  _id: Scalars['ObjectId'];
  orderShippingId?: Maybe<Scalars['ObjectId']>;
  placedAt?: Maybe<Scalars['Date']>;
  price: Scalars['Float'];
  status: OrderStatus;
  userId: Scalars['ObjectId'];
};

export type OrderShipping = OrderShippingModel & {
  __typename?: 'OrderShipping';
  _id: Scalars['ObjectId'];
  deliveredAt?: Maybe<Scalars['Date']>;
  dimension?: Maybe<Scalars['String']>;
  price: Scalars['Float'];
  shippedAt?: Maybe<Scalars['Date']>;
  shippingMethod: ShippingMethod;
  shippingMethodId: Scalars['ObjectId'];
  shippingMethodSnapshot: ShippingMethod;
  weight?: Maybe<Scalars['String']>;
};

export type OrderShippingModel = {
  _id: Scalars['ObjectId'];
  deliveredAt?: Maybe<Scalars['Date']>;
  dimension?: Maybe<Scalars['String']>;
  price: Scalars['Float'];
  shippedAt?: Maybe<Scalars['Date']>;
  shippingMethodId: Scalars['ObjectId'];
  shippingMethodSnapshot: ShippingMethod;
  weight?: Maybe<Scalars['String']>;
};

export enum OrderStatus {
  Canceled = 'CANCELED',
  Delivered = 'DELIVERED',
  Draft = 'DRAFT',
  Placed = 'PLACED',
  Shipping = 'SHIPPING'
}

export type PaymentMethod = {
  __typename?: 'PaymentMethod';
  _id: Scalars['ObjectId'];
  name: Scalars['String'];
};

export enum Permission {
  Accounting = 'ACCOUNTING',
  Admin = 'ADMIN',
  Product = 'PRODUCT'
}

export type Product = ProductModel & {
  __typename?: 'Product';
  _id: Scalars['ObjectId'];
  attributeValues: Array<AttributeValue>;
  categoryId: Scalars['ObjectId'];
  createdAt?: Maybe<Scalars['Date']>;
  defaultImageId: Scalars['ObjectId'];
  imageIds: Array<Scalars['ObjectId']>;
  isHidden?: Maybe<Scalars['Boolean']>;
  name: Scalars['String'];
  price: Scalars['Float'];
  productGroupId: Scalars['ObjectId'];
  quantity?: Maybe<Scalars['Int']>;
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

export type ProductModel = {
  _id: Scalars['ObjectId'];
  attributeValues: Array<AttributeValue>;
  categoryId: Scalars['ObjectId'];
  createdAt?: Maybe<Scalars['Date']>;
  defaultImageId: Scalars['ObjectId'];
  imageIds: Array<Scalars['ObjectId']>;
  isHidden?: Maybe<Scalars['Boolean']>;
  name: Scalars['String'];
  price: Scalars['Float'];
  productGroupId: Scalars['ObjectId'];
  quantity?: Maybe<Scalars['Int']>;
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
  cart: Order;
  categories: Array<Category>;
  exchangeRate: ExchangeRate;
  hello?: Maybe<Scalars['String']>;
  me: User;
  productGroups: Array<ProductGroup>;
  products: Array<Product>;
  user: User;
};


export type QueryExchangeRateArgs = {
  name: Scalars['String'];
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

export type RemoveFromCartInput = {
  orderItemId: Scalars['ObjectId'];
};

export type SendVerificationCodeInput = {
  phoneNumber: Scalars['String'];
};

export type ShippingMethod = {
  __typename?: 'ShippingMethod';
  _id: Scalars['ObjectId'];
  name: Scalars['String'];
};

export type UpdateOrderItemQuantityInput = {
  orderItemId: Scalars['ObjectId'];
  quantity: Scalars['Int'];
};

export type User = UserModel & {
  __typename?: 'User';
  _id: Scalars['ObjectId'];
  balance: Scalars['Float'];
  currency: Scalars['String'];
  name?: Maybe<Scalars['String']>;
  permissions?: Maybe<Array<Permission>>;
  phoneNumber: Scalars['String'];
};

export type UserInput = {
  _id: Scalars['ObjectId'];
};

export type UserModel = {
  _id: Scalars['ObjectId'];
  balance: Scalars['Float'];
  currency: Scalars['String'];
  name?: Maybe<Scalars['String']>;
  permissions?: Maybe<Array<Permission>>;
  phoneNumber: Scalars['String'];
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
  AddToCartInput: AddToCartInput;
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
  ExchangeRate: ResolverTypeWrapper<ExchangeRate>;
  ExchangeRateModel: ResolversTypes['ExchangeRate'];
  Float: ResolverTypeWrapper<Scalars['Float']>;
  Image: ResolverTypeWrapper<Image>;
  Int: ResolverTypeWrapper<Scalars['Int']>;
  Invoice: ResolverTypeWrapper<Invoice>;
  Mutation: ResolverTypeWrapper<{}>;
  ObjectId: ResolverTypeWrapper<Scalars['ObjectId']>;
  Order: ResolverTypeWrapper<Order>;
  OrderItem: ResolverTypeWrapper<OrderItem>;
  OrderItemModel: ResolversTypes['OrderItem'];
  OrderModel: ResolversTypes['Order'];
  OrderShipping: ResolverTypeWrapper<OrderShipping>;
  OrderShippingModel: ResolversTypes['OrderShipping'];
  OrderStatus: OrderStatus;
  PaymentMethod: ResolverTypeWrapper<PaymentMethod>;
  Permission: Permission;
  Product: ResolverTypeWrapper<Product>;
  ProductGroup: ResolverTypeWrapper<ProductGroup>;
  ProductGroupsFilter: ProductGroupsFilter;
  ProductGroupsOptions: ProductGroupsOptions;
  ProductGroupsSort: ProductGroupsSort;
  ProductModel: ResolversTypes['Product'];
  ProductsFilter: ProductsFilter;
  ProductsOptions: ProductsOptions;
  ProductsSort: ProductsSort;
  Query: ResolverTypeWrapper<{}>;
  RemoveFromCartInput: RemoveFromCartInput;
  SendVerificationCodeInput: SendVerificationCodeInput;
  ShippingMethod: ResolverTypeWrapper<ShippingMethod>;
  String: ResolverTypeWrapper<Scalars['String']>;
  UpdateOrderItemQuantityInput: UpdateOrderItemQuantityInput;
  User: ResolverTypeWrapper<User>;
  UserInput: UserInput;
  UserModel: ResolversTypes['User'];
  VerificationCode: ResolverTypeWrapper<VerificationCode>;
}>;

/** Mapping between all available schema types and the resolvers parents */
export type ResolversParentTypes = ResolversObject<{
  AddToCartInput: AddToCartInput;
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
  ExchangeRate: ExchangeRate;
  ExchangeRateModel: ResolversParentTypes['ExchangeRate'];
  Float: Scalars['Float'];
  Image: Image;
  Int: Scalars['Int'];
  Invoice: Invoice;
  Mutation: {};
  ObjectId: Scalars['ObjectId'];
  Order: Order;
  OrderItem: OrderItem;
  OrderItemModel: ResolversParentTypes['OrderItem'];
  OrderModel: ResolversParentTypes['Order'];
  OrderShipping: OrderShipping;
  OrderShippingModel: ResolversParentTypes['OrderShipping'];
  PaymentMethod: PaymentMethod;
  Product: Product;
  ProductGroup: ProductGroup;
  ProductGroupsFilter: ProductGroupsFilter;
  ProductGroupsOptions: ProductGroupsOptions;
  ProductGroupsSort: ProductGroupsSort;
  ProductModel: ResolversParentTypes['Product'];
  ProductsFilter: ProductsFilter;
  ProductsOptions: ProductsOptions;
  ProductsSort: ProductsSort;
  Query: {};
  RemoveFromCartInput: RemoveFromCartInput;
  SendVerificationCodeInput: SendVerificationCodeInput;
  ShippingMethod: ShippingMethod;
  String: Scalars['String'];
  UpdateOrderItemQuantityInput: UpdateOrderItemQuantityInput;
  User: User;
  UserInput: UserInput;
  UserModel: ResolversParentTypes['User'];
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

export type ExchangeRateResolvers<ContextType = Context, ParentType extends ResolversParentTypes['ExchangeRate'] = ResolversParentTypes['ExchangeRate']> = ResolversObject<{
  _id?: Resolver<ResolversTypes['ObjectId'], ParentType, ContextType>;
  name?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  rate?: Resolver<ResolversTypes['Float'], ParentType, ContextType>;
  updatedAt?: Resolver<Maybe<ResolversTypes['Date']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type ExchangeRateModelResolvers<ContextType = Context, ParentType extends ResolversParentTypes['ExchangeRateModel'] = ResolversParentTypes['ExchangeRateModel']> = ResolversObject<{
  __resolveType: TypeResolveFn<'ExchangeRate', ParentType, ContextType>;
  _id?: Resolver<ResolversTypes['ObjectId'], ParentType, ContextType>;
  name?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  rate?: Resolver<ResolversTypes['Float'], ParentType, ContextType>;
  updatedAt?: Resolver<Maybe<ResolversTypes['Date']>, ParentType, ContextType>;
}>;

export type ImageResolvers<ContextType = Context, ParentType extends ResolversParentTypes['Image'] = ResolversParentTypes['Image']> = ResolversObject<{
  _id?: Resolver<ResolversTypes['ObjectId'], ParentType, ContextType>;
  name?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type InvoiceResolvers<ContextType = Context, ParentType extends ResolversParentTypes['Invoice'] = ResolversParentTypes['Invoice']> = ResolversObject<{
  _id?: Resolver<ResolversTypes['ObjectId'], ParentType, ContextType>;
  createdAt?: Resolver<ResolversTypes['Date'], ParentType, ContextType>;
  orderId?: Resolver<ResolversTypes['ObjectId'], ParentType, ContextType>;
  paid?: Resolver<Maybe<ResolversTypes['Int']>, ParentType, ContextType>;
  paidAt?: Resolver<Maybe<ResolversTypes['Date']>, ParentType, ContextType>;
  paymentMethod?: Resolver<Maybe<ResolversTypes['PaymentMethod']>, ParentType, ContextType>;
  paymentMethodId?: Resolver<Maybe<ResolversTypes['ObjectId']>, ParentType, ContextType>;
  paymentMethodSnapshot?: Resolver<Maybe<ResolversTypes['PaymentMethod']>, ParentType, ContextType>;
  price?: Resolver<ResolversTypes['Float'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type MutationResolvers<ContextType = Context, ParentType extends ResolversParentTypes['Mutation'] = ResolversParentTypes['Mutation']> = ResolversObject<{
  addToCart?: Resolver<ResolversTypes['Order'], ParentType, ContextType, RequireFields<MutationAddToCartArgs, 'input'>>;
  confirmVerificationCode?: Resolver<ResolversTypes['String'], ParentType, ContextType, RequireFields<MutationConfirmVerificationCodeArgs, 'ConfirmVerificationCodeInput'>>;
  createCategory?: Resolver<ResolversTypes['Category'], ParentType, ContextType, RequireFields<MutationCreateCategoryArgs, 'input'>>;
  createProduct?: Resolver<ResolversTypes['Product'], ParentType, ContextType, RequireFields<MutationCreateProductArgs, 'input'>>;
  createProductGroup?: Resolver<ResolversTypes['ProductGroup'], ParentType, ContextType, RequireFields<MutationCreateProductGroupArgs, 'input'>>;
  removeFromCart?: Resolver<ResolversTypes['Order'], ParentType, ContextType, RequireFields<MutationRemoveFromCartArgs, 'input'>>;
  sendVerificationCode?: Resolver<Maybe<ResolversTypes['Boolean']>, ParentType, ContextType, RequireFields<MutationSendVerificationCodeArgs, 'SendVerificationCodeInput'>>;
  updateOrderItemQuantity?: Resolver<ResolversTypes['Order'], ParentType, ContextType, RequireFields<MutationUpdateOrderItemQuantityArgs, 'input'>>;
}>;

export interface ObjectIdScalarConfig extends GraphQLScalarTypeConfig<ResolversTypes['ObjectId'], any> {
  name: 'ObjectId';
}

export type OrderResolvers<ContextType = Context, ParentType extends ResolversParentTypes['Order'] = ResolversParentTypes['Order']> = ResolversObject<{
  _id?: Resolver<ResolversTypes['ObjectId'], ParentType, ContextType>;
  orderItems?: Resolver<Array<ResolversTypes['OrderItem']>, ParentType, ContextType>;
  orderShipping?: Resolver<Maybe<ResolversTypes['OrderShipping']>, ParentType, ContextType>;
  orderShippingId?: Resolver<Maybe<ResolversTypes['ObjectId']>, ParentType, ContextType>;
  placedAt?: Resolver<Maybe<ResolversTypes['Date']>, ParentType, ContextType>;
  price?: Resolver<ResolversTypes['Float'], ParentType, ContextType>;
  status?: Resolver<ResolversTypes['OrderStatus'], ParentType, ContextType>;
  user?: Resolver<Maybe<ResolversTypes['User']>, ParentType, ContextType>;
  userId?: Resolver<ResolversTypes['ObjectId'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type OrderItemResolvers<ContextType = Context, ParentType extends ResolversParentTypes['OrderItem'] = ResolversParentTypes['OrderItem']> = ResolversObject<{
  _id?: Resolver<ResolversTypes['ObjectId'], ParentType, ContextType>;
  orderId?: Resolver<ResolversTypes['ObjectId'], ParentType, ContextType>;
  product?: Resolver<Maybe<ResolversTypes['Product']>, ParentType, ContextType>;
  productId?: Resolver<ResolversTypes['ObjectId'], ParentType, ContextType>;
  productSnapshot?: Resolver<ResolversTypes['Product'], ParentType, ContextType>;
  quantity?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type OrderItemModelResolvers<ContextType = Context, ParentType extends ResolversParentTypes['OrderItemModel'] = ResolversParentTypes['OrderItemModel']> = ResolversObject<{
  __resolveType: TypeResolveFn<'OrderItem', ParentType, ContextType>;
  _id?: Resolver<ResolversTypes['ObjectId'], ParentType, ContextType>;
  orderId?: Resolver<ResolversTypes['ObjectId'], ParentType, ContextType>;
  productId?: Resolver<ResolversTypes['ObjectId'], ParentType, ContextType>;
  productSnapshot?: Resolver<ResolversTypes['Product'], ParentType, ContextType>;
  quantity?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
}>;

export type OrderModelResolvers<ContextType = Context, ParentType extends ResolversParentTypes['OrderModel'] = ResolversParentTypes['OrderModel']> = ResolversObject<{
  __resolveType: TypeResolveFn<'Order', ParentType, ContextType>;
  _id?: Resolver<ResolversTypes['ObjectId'], ParentType, ContextType>;
  orderShippingId?: Resolver<Maybe<ResolversTypes['ObjectId']>, ParentType, ContextType>;
  placedAt?: Resolver<Maybe<ResolversTypes['Date']>, ParentType, ContextType>;
  price?: Resolver<ResolversTypes['Float'], ParentType, ContextType>;
  status?: Resolver<ResolversTypes['OrderStatus'], ParentType, ContextType>;
  userId?: Resolver<ResolversTypes['ObjectId'], ParentType, ContextType>;
}>;

export type OrderShippingResolvers<ContextType = Context, ParentType extends ResolversParentTypes['OrderShipping'] = ResolversParentTypes['OrderShipping']> = ResolversObject<{
  _id?: Resolver<ResolversTypes['ObjectId'], ParentType, ContextType>;
  deliveredAt?: Resolver<Maybe<ResolversTypes['Date']>, ParentType, ContextType>;
  dimension?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  price?: Resolver<ResolversTypes['Float'], ParentType, ContextType>;
  shippedAt?: Resolver<Maybe<ResolversTypes['Date']>, ParentType, ContextType>;
  shippingMethod?: Resolver<ResolversTypes['ShippingMethod'], ParentType, ContextType>;
  shippingMethodId?: Resolver<ResolversTypes['ObjectId'], ParentType, ContextType>;
  shippingMethodSnapshot?: Resolver<ResolversTypes['ShippingMethod'], ParentType, ContextType>;
  weight?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type OrderShippingModelResolvers<ContextType = Context, ParentType extends ResolversParentTypes['OrderShippingModel'] = ResolversParentTypes['OrderShippingModel']> = ResolversObject<{
  __resolveType: TypeResolveFn<'OrderShipping', ParentType, ContextType>;
  _id?: Resolver<ResolversTypes['ObjectId'], ParentType, ContextType>;
  deliveredAt?: Resolver<Maybe<ResolversTypes['Date']>, ParentType, ContextType>;
  dimension?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  price?: Resolver<ResolversTypes['Float'], ParentType, ContextType>;
  shippedAt?: Resolver<Maybe<ResolversTypes['Date']>, ParentType, ContextType>;
  shippingMethodId?: Resolver<ResolversTypes['ObjectId'], ParentType, ContextType>;
  shippingMethodSnapshot?: Resolver<ResolversTypes['ShippingMethod'], ParentType, ContextType>;
  weight?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
}>;

export type PaymentMethodResolvers<ContextType = Context, ParentType extends ResolversParentTypes['PaymentMethod'] = ResolversParentTypes['PaymentMethod']> = ResolversObject<{
  _id?: Resolver<ResolversTypes['ObjectId'], ParentType, ContextType>;
  name?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type ProductResolvers<ContextType = Context, ParentType extends ResolversParentTypes['Product'] = ResolversParentTypes['Product']> = ResolversObject<{
  _id?: Resolver<ResolversTypes['ObjectId'], ParentType, ContextType>;
  attributeValues?: Resolver<Array<ResolversTypes['AttributeValue']>, ParentType, ContextType>;
  categoryId?: Resolver<ResolversTypes['ObjectId'], ParentType, ContextType>;
  createdAt?: Resolver<Maybe<ResolversTypes['Date']>, ParentType, ContextType>;
  defaultImageId?: Resolver<ResolversTypes['ObjectId'], ParentType, ContextType>;
  imageIds?: Resolver<Array<ResolversTypes['ObjectId']>, ParentType, ContextType>;
  isHidden?: Resolver<Maybe<ResolversTypes['Boolean']>, ParentType, ContextType>;
  name?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  price?: Resolver<ResolversTypes['Float'], ParentType, ContextType>;
  productGroupId?: Resolver<ResolversTypes['ObjectId'], ParentType, ContextType>;
  quantity?: Resolver<Maybe<ResolversTypes['Int']>, ParentType, ContextType>;
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

export type ProductModelResolvers<ContextType = Context, ParentType extends ResolversParentTypes['ProductModel'] = ResolversParentTypes['ProductModel']> = ResolversObject<{
  __resolveType: TypeResolveFn<'Product', ParentType, ContextType>;
  _id?: Resolver<ResolversTypes['ObjectId'], ParentType, ContextType>;
  attributeValues?: Resolver<Array<ResolversTypes['AttributeValue']>, ParentType, ContextType>;
  categoryId?: Resolver<ResolversTypes['ObjectId'], ParentType, ContextType>;
  createdAt?: Resolver<Maybe<ResolversTypes['Date']>, ParentType, ContextType>;
  defaultImageId?: Resolver<ResolversTypes['ObjectId'], ParentType, ContextType>;
  imageIds?: Resolver<Array<ResolversTypes['ObjectId']>, ParentType, ContextType>;
  isHidden?: Resolver<Maybe<ResolversTypes['Boolean']>, ParentType, ContextType>;
  name?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  price?: Resolver<ResolversTypes['Float'], ParentType, ContextType>;
  productGroupId?: Resolver<ResolversTypes['ObjectId'], ParentType, ContextType>;
  quantity?: Resolver<Maybe<ResolversTypes['Int']>, ParentType, ContextType>;
}>;

export type QueryResolvers<ContextType = Context, ParentType extends ResolversParentTypes['Query'] = ResolversParentTypes['Query']> = ResolversObject<{
  cart?: Resolver<ResolversTypes['Order'], ParentType, ContextType>;
  categories?: Resolver<Array<ResolversTypes['Category']>, ParentType, ContextType>;
  exchangeRate?: Resolver<ResolversTypes['ExchangeRate'], ParentType, ContextType, RequireFields<QueryExchangeRateArgs, 'name'>>;
  hello?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  me?: Resolver<ResolversTypes['User'], ParentType, ContextType>;
  productGroups?: Resolver<Array<ResolversTypes['ProductGroup']>, ParentType, ContextType, Partial<QueryProductGroupsArgs>>;
  products?: Resolver<Array<ResolversTypes['Product']>, ParentType, ContextType, Partial<QueryProductsArgs>>;
  user?: Resolver<ResolversTypes['User'], ParentType, ContextType, RequireFields<QueryUserArgs, 'UserInput'>>;
}>;

export type ShippingMethodResolvers<ContextType = Context, ParentType extends ResolversParentTypes['ShippingMethod'] = ResolversParentTypes['ShippingMethod']> = ResolversObject<{
  _id?: Resolver<ResolversTypes['ObjectId'], ParentType, ContextType>;
  name?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type UserResolvers<ContextType = Context, ParentType extends ResolversParentTypes['User'] = ResolversParentTypes['User']> = ResolversObject<{
  _id?: Resolver<ResolversTypes['ObjectId'], ParentType, ContextType>;
  balance?: Resolver<ResolversTypes['Float'], ParentType, ContextType>;
  currency?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  name?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  permissions?: Resolver<Maybe<Array<ResolversTypes['Permission']>>, ParentType, ContextType>;
  phoneNumber?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type UserModelResolvers<ContextType = Context, ParentType extends ResolversParentTypes['UserModel'] = ResolversParentTypes['UserModel']> = ResolversObject<{
  __resolveType: TypeResolveFn<'User', ParentType, ContextType>;
  _id?: Resolver<ResolversTypes['ObjectId'], ParentType, ContextType>;
  balance?: Resolver<ResolversTypes['Float'], ParentType, ContextType>;
  currency?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  name?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  permissions?: Resolver<Maybe<Array<ResolversTypes['Permission']>>, ParentType, ContextType>;
  phoneNumber?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
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
  ExchangeRate?: ExchangeRateResolvers<ContextType>;
  ExchangeRateModel?: ExchangeRateModelResolvers<ContextType>;
  Image?: ImageResolvers<ContextType>;
  Invoice?: InvoiceResolvers<ContextType>;
  Mutation?: MutationResolvers<ContextType>;
  ObjectId?: GraphQLScalarType;
  Order?: OrderResolvers<ContextType>;
  OrderItem?: OrderItemResolvers<ContextType>;
  OrderItemModel?: OrderItemModelResolvers<ContextType>;
  OrderModel?: OrderModelResolvers<ContextType>;
  OrderShipping?: OrderShippingResolvers<ContextType>;
  OrderShippingModel?: OrderShippingModelResolvers<ContextType>;
  PaymentMethod?: PaymentMethodResolvers<ContextType>;
  Product?: ProductResolvers<ContextType>;
  ProductGroup?: ProductGroupResolvers<ContextType>;
  ProductModel?: ProductModelResolvers<ContextType>;
  Query?: QueryResolvers<ContextType>;
  ShippingMethod?: ShippingMethodResolvers<ContextType>;
  User?: UserResolvers<ContextType>;
  UserModel?: UserModelResolvers<ContextType>;
  VerificationCode?: VerificationCodeResolvers<ContextType>;
}>;

