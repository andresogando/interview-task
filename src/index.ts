// @flow
import express from "express";
import { connectToMongoDB } from "./config/mongodb";
import { ApolloServer } from "apollo-server-express";
import typeDefs from "./graphql/typeDefs";
import resolvers from "./graphql/resolvers";

async function startServer() {
  const app = express();
  const PORT = 3000;

  const server = new ApolloServer({
    typeDefs,
    resolvers,
  });

  await connectToMongoDB();
  await server.start();

  server.applyMiddleware({ app });

  app.get("/", function (req, res) {
    res.end("Hello world!");
  });

  app.listen(PORT, () =>
    console.log(
      `🚀 Server ready at http://localhost:${PORT}${server.graphqlPath}`,
    ),
  );
}

startServer();
