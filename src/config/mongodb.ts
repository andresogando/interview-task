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
        url
      )
    );
};

export { connectToMongoDB };



// const { MongoClient } = require("mongodb");
// const uri =
//   "mongodb+srv://<username>:<password>@cluster0.y2hwn.mongodb.net/myFirstDatabase?retryWrites=true&w=majority";
// const client = new MongoClient(uri, {
//   useNewUrlParser: true,
//   useUnifiedTopology: true,
// });
// client.connect((err) => {
//   const collection = client.db("test").collection("devices");
//   // perform actions on the collection object
//   client.close();
// });
