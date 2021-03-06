// @flow
import express from "express";
import { connectToMongoDB } from "./config/mongodb";
import usersRouter from "./routes/users";
import tweetsRouter from "./routes/tweets";
import routerLogger from "./utils/logger";

async function startServer() {
  const app = express();
  const PORT = 3000;

  // app.use(Router);
  await connectToMongoDB();
  app.use(express.json());
  app.use(
    express.urlencoded({
      extended: true,
    })
  );
  app.use(routerLogger);

  app.use("/user", usersRouter);
  app.use("/tweets", tweetsRouter);

  app.get("/", function (req, res) {
    res.end("Hello world!");
  });

  app.listen(PORT, () =>
    console.log(`🚀 Server ready at http://localhost:${PORT}`)
  );
}

startServer();
