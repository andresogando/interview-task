// @flow
import express from "express";
import { connectToMongoDB } from "./config/mongodb";
import { ApolloServer } from "apollo-server-express";
import typeDefs from "./graphql/typeDefs";
import resolvers from "./graphql/resolvers";
import { createDataSourceInstances } from "./graphql/dataSources/index";
import { Router } from "express";
import users from "./routes/users";

async function startServer() {
  const app = express();
  const PORT = 3000;

  // app.use(Router);
  await connectToMongoDB();
  app.use(express.json());
  app.use(
    express.urlencoded({
      extended: true,
    }),
  );

  app.use("/user", users),
    app.get("/", function (req, res) {
      res.end("Hello world!");
    });

  app.listen(PORT, () =>
    console.log(`🚀 Server ready at http://localhost:${PORT}`),
  );
}

startServer();
