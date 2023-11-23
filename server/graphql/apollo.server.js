const { ApolloServer } = require("@apollo/server");
const fs = require("node:fs/promises");
const resolvers = require("./resolver.js");
async function apolloServer() {
  const typeDefs = await fs.readFile("./graphql/schema.graphql", "utf8");
  const server = new ApolloServer({
    typeDefs,
    resolvers,
    formatError: (error) => {
      // will amend the req such that response will its statuscode & it s message
      console.log("GQL error", error.originalError);
      // const context = error.extensions?.context;
      // if (context?.res) {
      //   context.res
      //     .status(error.extensions.statusCode)
      //     .json({ message: error.message });
      // }
      delete error.extensions?.context;
      return error;
    },
  });
  return server;
}

module.exports = apolloServer;
