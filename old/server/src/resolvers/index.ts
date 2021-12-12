import { QueryResolvers } from '../generated/graphql';
import { MicroCmsRestApi } from '../datasources/MicroCmsRestApi'

type DataSources = {
  dataSources: {
    microCmsRestApi: MicroCmsRestApi
  }
}
const Query: QueryResolvers = {
  contents: (_, __, { dataSources }: DataSources) =>
    dataSources.microCmsRestApi.fetchAllContents(),
  singleContentsById: (_, { id }, { dataSources }: DataSources) =>
    dataSources.microCmsRestApi.fetchSingleContentsById({ id }),
  arranged: (_, __, { dataSources }: DataSources) =>
    dataSources.microCmsRestApi.fetchArranged(),
  favorites: (_, __, { dataSources }: DataSources) =>
    dataSources.microCmsRestApi.fetchFavorites(),
  favoritesByCategoryIds: (_, __, { dataSources }: DataSources) =>
    dataSources.microCmsRestApi.fetchFavoritesByCategoryIds()
}

export const resolvers = {
  Query
}
