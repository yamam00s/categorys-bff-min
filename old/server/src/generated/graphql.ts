import { GraphQLResolveInfo, GraphQLScalarType, GraphQLScalarTypeConfig } from 'graphql';
export type Maybe<T> = T | null;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
export type RequireFields<T, K extends keyof T> = { [X in Exclude<keyof T, K>]?: T[X] } & { [P in K]-?: NonNullable<T[P]> };
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
  /** The `Upload` scalar type represents a file upload. */
  Upload: any;
};


export type Arranged = {
  __typename?: 'Arranged';
  id: Scalars['ID'];
  categoryId: Scalars['Int'];
  contents?: Maybe<Array<Maybe<Contents>>>;
};

export enum CacheControlScope {
  Public = 'PUBLIC',
  Private = 'PRIVATE'
}

export type Contents = {
  __typename?: 'Contents';
  id: Scalars['ID'];
  categoryId: Scalars['Int'];
  title: Scalars['String'];
  public_started: Scalars['String'];
  public_ended: Scalars['String'];
  priority: Scalars['Int'];
};

export type FavoriteUpdateResponse = {
  __typename?: 'FavoriteUpdateResponse';
  success: Scalars['Boolean'];
  message?: Maybe<Scalars['String']>;
  favorites?: Maybe<Array<Maybe<Favorites>>>;
};

export type Favorites = {
  __typename?: 'Favorites';
  id: Scalars['ID'];
  contents?: Maybe<Contents>;
};

export type FavoritesByCategoryIds = {
  __typename?: 'FavoritesByCategoryIds';
  categoryId: Scalars['Int'];
  contents?: Maybe<Array<Maybe<Contents>>>;
};

export type Mutation = {
  __typename?: 'Mutation';
  addFavorite: FavoriteUpdateResponse;
  removeFavorite: FavoriteUpdateResponse;
};


export type MutationAddFavoriteArgs = {
  title: Scalars['String'];
};


export type MutationRemoveFavoriteArgs = {
  title: Scalars['String'];
};

export type Query = {
  __typename?: 'Query';
  contents?: Maybe<Array<Maybe<Contents>>>;
  singleContentsById?: Maybe<Contents>;
  arranged?: Maybe<Array<Maybe<Arranged>>>;
  favorites?: Maybe<Array<Maybe<Favorites>>>;
  favoritesByCategoryIds?: Maybe<Array<Maybe<FavoritesByCategoryIds>>>;
};


export type QuerySingleContentsByIdArgs = {
  id: Scalars['ID'];
};




export type ResolverTypeWrapper<T> = Promise<T> | T;


export type LegacyStitchingResolver<TResult, TParent, TContext, TArgs> = {
  fragment: string;
  resolve: ResolverFn<TResult, TParent, TContext, TArgs>;
};

export type NewStitchingResolver<TResult, TParent, TContext, TArgs> = {
  selectionSet: string;
  resolve: ResolverFn<TResult, TParent, TContext, TArgs>;
};
export type StitchingResolver<TResult, TParent, TContext, TArgs> = LegacyStitchingResolver<TResult, TParent, TContext, TArgs> | NewStitchingResolver<TResult, TParent, TContext, TArgs>;
export type Resolver<TResult, TParent = {}, TContext = {}, TArgs = {}> =
  | ResolverFn<TResult, TParent, TContext, TArgs>
  | StitchingResolver<TResult, TParent, TContext, TArgs>;

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
) => AsyncIterator<TResult> | Promise<AsyncIterator<TResult>>;

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
  Arranged: ResolverTypeWrapper<Arranged>;
  ID: ResolverTypeWrapper<Scalars['ID']>;
  Int: ResolverTypeWrapper<Scalars['Int']>;
  CacheControlScope: CacheControlScope;
  Contents: ResolverTypeWrapper<Contents>;
  String: ResolverTypeWrapper<Scalars['String']>;
  FavoriteUpdateResponse: ResolverTypeWrapper<FavoriteUpdateResponse>;
  Boolean: ResolverTypeWrapper<Scalars['Boolean']>;
  Favorites: ResolverTypeWrapper<Favorites>;
  FavoritesByCategoryIds: ResolverTypeWrapper<FavoritesByCategoryIds>;
  Mutation: ResolverTypeWrapper<{}>;
  Query: ResolverTypeWrapper<{}>;
  Upload: ResolverTypeWrapper<Scalars['Upload']>;
};

/** Mapping between all available schema types and the resolvers parents */
export type ResolversParentTypes = {
  Arranged: Arranged;
  ID: Scalars['ID'];
  Int: Scalars['Int'];
  Contents: Contents;
  String: Scalars['String'];
  FavoriteUpdateResponse: FavoriteUpdateResponse;
  Boolean: Scalars['Boolean'];
  Favorites: Favorites;
  FavoritesByCategoryIds: FavoritesByCategoryIds;
  Mutation: {};
  Query: {};
  Upload: Scalars['Upload'];
};

export type CacheControlDirectiveArgs = {   maxAge?: Maybe<Scalars['Int']>;
  scope?: Maybe<CacheControlScope>; };

export type CacheControlDirectiveResolver<Result, Parent, ContextType = any, Args = CacheControlDirectiveArgs> = DirectiveResolverFn<Result, Parent, ContextType, Args>;

export type ArrangedResolvers<ContextType = any, ParentType extends ResolversParentTypes['Arranged'] = ResolversParentTypes['Arranged']> = {
  id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  categoryId?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  contents?: Resolver<Maybe<Array<Maybe<ResolversTypes['Contents']>>>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type ContentsResolvers<ContextType = any, ParentType extends ResolversParentTypes['Contents'] = ResolversParentTypes['Contents']> = {
  id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  categoryId?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  title?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  public_started?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  public_ended?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  priority?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type FavoriteUpdateResponseResolvers<ContextType = any, ParentType extends ResolversParentTypes['FavoriteUpdateResponse'] = ResolversParentTypes['FavoriteUpdateResponse']> = {
  success?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType>;
  message?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  favorites?: Resolver<Maybe<Array<Maybe<ResolversTypes['Favorites']>>>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type FavoritesResolvers<ContextType = any, ParentType extends ResolversParentTypes['Favorites'] = ResolversParentTypes['Favorites']> = {
  id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  contents?: Resolver<Maybe<ResolversTypes['Contents']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type FavoritesByCategoryIdsResolvers<ContextType = any, ParentType extends ResolversParentTypes['FavoritesByCategoryIds'] = ResolversParentTypes['FavoritesByCategoryIds']> = {
  categoryId?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  contents?: Resolver<Maybe<Array<Maybe<ResolversTypes['Contents']>>>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type MutationResolvers<ContextType = any, ParentType extends ResolversParentTypes['Mutation'] = ResolversParentTypes['Mutation']> = {
  addFavorite?: Resolver<ResolversTypes['FavoriteUpdateResponse'], ParentType, ContextType, RequireFields<MutationAddFavoriteArgs, 'title'>>;
  removeFavorite?: Resolver<ResolversTypes['FavoriteUpdateResponse'], ParentType, ContextType, RequireFields<MutationRemoveFavoriteArgs, 'title'>>;
};

export type QueryResolvers<ContextType = any, ParentType extends ResolversParentTypes['Query'] = ResolversParentTypes['Query']> = {
  contents?: Resolver<Maybe<Array<Maybe<ResolversTypes['Contents']>>>, ParentType, ContextType>;
  singleContentsById?: Resolver<Maybe<ResolversTypes['Contents']>, ParentType, ContextType, RequireFields<QuerySingleContentsByIdArgs, 'id'>>;
  arranged?: Resolver<Maybe<Array<Maybe<ResolversTypes['Arranged']>>>, ParentType, ContextType>;
  favorites?: Resolver<Maybe<Array<Maybe<ResolversTypes['Favorites']>>>, ParentType, ContextType>;
  favoritesByCategoryIds?: Resolver<Maybe<Array<Maybe<ResolversTypes['FavoritesByCategoryIds']>>>, ParentType, ContextType>;
};

export interface UploadScalarConfig extends GraphQLScalarTypeConfig<ResolversTypes['Upload'], any> {
  name: 'Upload';
}

export type Resolvers<ContextType = any> = {
  Arranged?: ArrangedResolvers<ContextType>;
  Contents?: ContentsResolvers<ContextType>;
  FavoriteUpdateResponse?: FavoriteUpdateResponseResolvers<ContextType>;
  Favorites?: FavoritesResolvers<ContextType>;
  FavoritesByCategoryIds?: FavoritesByCategoryIdsResolvers<ContextType>;
  Mutation?: MutationResolvers<ContextType>;
  Query?: QueryResolvers<ContextType>;
  Upload?: GraphQLScalarType;
};


/**
 * @deprecated
 * Use "Resolvers" root object instead. If you wish to get "IResolvers", add "typesPrefix: I" to your config.
 */
export type IResolvers<ContextType = any> = Resolvers<ContextType>;
export type DirectiveResolvers<ContextType = any> = {
  cacheControl?: CacheControlDirectiveResolver<any, any, ContextType>;
};


/**
 * @deprecated
 * Use "DirectiveResolvers" root object instead. If you wish to get "IDirectiveResolvers", add "typesPrefix: I" to your config.
 */
export type IDirectiveResolvers<ContextType = any> = DirectiveResolvers<ContextType>;