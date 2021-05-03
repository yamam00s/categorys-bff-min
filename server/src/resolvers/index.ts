export const resolvers = {
  Query: {
    contents: (_, __, { dataSources }) =>
      dataSources.microCmsRestApi.fetchAllContents(),
    arranged: (_, __, { dataSources }) =>
      dataSources.microCmsRestApi.fetchArranged()
  }
}
