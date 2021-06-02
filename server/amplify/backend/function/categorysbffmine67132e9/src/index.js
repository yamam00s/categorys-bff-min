var __makeTemplateObject = (this && this.__makeTemplateObject) || function (cooked, raw) {
    if (Object.defineProperty) { Object.defineProperty(cooked, "raw", { value: raw }); } else { cooked.raw = raw; }
    return cooked;
};
var _a = require('apollo-server-lambda'), ApolloServer = _a.ApolloServer, gql = _a.gql;
/* Construct a schema, using GraphQL schema language */
var typeDefs = gql(__makeTemplateObject(["\n  type Query { hello: String }\n"], ["\n  type Query { hello: String }\n"
    /* Provide resolver functions for your schema fields */
]));
/* Provide resolver functions for your schema fields */
var resolvers = {
    Query: {
        hello: function () { return 'Hello from Apollo!!'; }
    }
};
var server = new ApolloServer({
    typeDefs: typeDefs,
    resolvers: resolvers,
    context: function (_a) {
        var event = _a.event, context = _a.context;
        return ({
            headers: event.headers,
            functionName: context.functionName,
            event: event,
            context: context
        });
    }
});
exports.handler = server.createHandler({
    cors: {
        origin: '*',
        credentials: true
    }
});
