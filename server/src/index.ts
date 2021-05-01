import { ApolloServer } from 'apollo-server'
import { typeDefs } from './schema'
// import { resolvers } from './resolvers'
// import { fetchCms } from './utils/fetch-cms'

// The ApolloServer constructor requires two parameters: your schema
// definition and your set of resolvers.
const server = new ApolloServer({ typeDefs });

// The `listen` method launches a web server.
server.listen().then(async({ url }: { url: string }) => {
  // const arranged = await fetchCms('arranged')
  // console.log(arranged)
  console.log(`🚀  Server ready at ${url}`);
})
