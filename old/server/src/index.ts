import { ApolloServer } from 'apollo-server'
// import { ApolloServer } from 'apollo-server-lambda'
import { typeDefs } from './schema'
import { resolvers } from './resolvers'
import { MicroCmsRestApi } from './datasources/MicroCmsRestApi'

const server = new ApolloServer({
  typeDefs,
  resolvers,
  dataSources: () => ({
    microCmsRestApi: new MicroCmsRestApi()
  }),
  // context: ({ event, context }) => ({
  //   headers: event.headers,
  //   functionName: context.functionName,
  //   event,
  //   context,
  // })
})

// The `listen` method launches a web server.
server.listen().then(async({ url }: { url: string }) => {
  console.log(`🚀  Server ready at ${url}`)
})

// exports.handler = server.createHandler({
//   cors: {
//     origin: '*',
//     credentials: true,
//   }
// })
