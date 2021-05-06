export const resolvers = {
  Query: {
    contents: (_, __, { dataSources }) =>
      dataSources.microCmsRestApi.fetchAllContents(),
    singleContentsById: (_, { id }, { dataSources }) =>
      dataSources.microCmsRestApi.fetchSingleContentsById({ id }),
    arranged: (_, __, { dataSources }) =>
      dataSources.microCmsRestApi.fetchArranged(),
    favorites: (_, __, { dataSources }) =>
      dataSources.microCmsRestApi.fetchFavorites(),
    favoritesByCategoryIds: (_, __, { dataSources }) =>
    dataSources.microCmsRestApi.fetchFavoritesByCategoryIds()
  }
}
