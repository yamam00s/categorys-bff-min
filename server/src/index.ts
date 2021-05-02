import { ApolloServer } from 'apollo-server'
import { typeDefs } from './schema'
import { resolvers } from './resolvers'
import { MicroCmsRestApi } from './datasources/MicroCmsRestApi'

const server = new ApolloServer({
  typeDefs,
  resolvers,
  dataSources: () => ({
    microCmsRestApi: new MicroCmsRestApi()
  })
})

// The `listen` method launches a web server.
server.listen().then(async({ url }: { url: string }) => {
  console.log(`🚀  Server ready at ${url}`)
})
