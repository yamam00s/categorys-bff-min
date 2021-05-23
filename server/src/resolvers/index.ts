import { QueryResolvers } from '../generated/graphql';

const Query: QueryResolvers = {
  contents: (_, __, { dataSources }) =>
    dataSources.microCmsRestApi.fetchAllContents(),
  singleContentsById: (_, { id }, { dataSources }) =>
    dataSources.microCmsRestApi.fetchSingleContentsById({ id }),
  arranged: (_, __, { dataSources }) =>
    dataSources.microCmsRestApi.fetchArranged() as string,
  favorites: (_, __, { dataSources }) =>
    dataSources.microCmsRestApi.fetchFavorites(),
  favoritesByCategoryIds: (_, __, { dataSources }) =>
    dataSources.microCmsRestApi.fetchFavoritesByCategoryIds()
}

export const resolvers = {
  Query
}
