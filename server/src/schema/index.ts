import { gql } from 'apollo-server'

// A schema is a collection of type definitions (hence "typeDefs")
// that together define the "shape" of queries that are executed against
// your data.
export const typeDefs = gql`
  type Contents {
    id: ID!
    categoryId: Int!
    title: String!
    public_started: String!
    public_ended: String!
    priority: Int!
  }

  type Arranged {
    id: ID!
    categoryId: Int!
    contents: [Contents]
  }

  type Favorites {
    id: ID!
    contents: Contents
  }

  type FavoritesByCategoryIds {
    categoryId: Int!
    contents: [Contents]
  }

  type Query {
    contents: [Contents]
    singleContentsById(id: ID!): Contents
    arranged: [Arranged]
    favorites: [Favorites]
    favoritesByCategoryIds: [FavoritesByCategoryIds]
  }

  type FavoriteUpdateResponse {
    success: Boolean!
    message: String
    favorites: [Favorites]
  }

  type Mutation {
    addFavorite(title: String!): FavoriteUpdateResponse!
    removeFavorite(title: String!): FavoriteUpdateResponse!
  }
`
