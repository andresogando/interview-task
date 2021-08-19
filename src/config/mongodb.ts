// @flow
require("dotenv").config();
import mongoose from "mongoose";

mongoose.set("useCreateIndex", true);

//mongo options
const mongoOptions = {
  useNewUrlParser: true,
  useCreateIndex: true,
  useUnifiedTopology: true,
  useFindAndModify: false,
  autoIndex: true,
  poolSize: 10,
  bufferMaxEntries: 0,
  connectTimeoutMS: 10000,
  socketTimeoutMS: 30000,
};

const url = process.env.MONGO_URL;

// database connection
const connectToMongoDB = async () => {
  await mongoose
    .connect(url, mongoOptions)
    .then(() => console.log(`Mongoose connection open to: `, url))
    .catch((error) =>
      console.log(
        `Mongoose connection error: ${error} with connection info`,
        url,
      ),
    );
};

export { connectToMongoDB };
