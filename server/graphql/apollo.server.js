const { ApolloServer } = require("@apollo/server");
const fs = require("node:fs/promises");
const resolvers = require("./resolver.js");

async function apolloServer() {
  const typeDefs = await fs.readFile("./graphql/schema.graphql", "utf8");
  const server = new ApolloServer({ typeDefs, resolvers });
  return server;
}

module.exports = apolloServer;
