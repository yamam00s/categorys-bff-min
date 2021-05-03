export const resolvers = {
  Query: {
    contents: (_, __, { dataSources }) =>
      dataSources.microCmsRestApi.getAllContents()
  }
}
