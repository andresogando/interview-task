import mongoose, { Schema, model } from "mongoose";
import { ITweetDocument } from "../interfaces/tweets.interfaces";

const tweetSchema = new Schema({
  body: { type: String },
  username: { type: String },
  createdAt: { type: String },
  comments: [
    {
      body: String,
      username: String,
      createdAt: String,
    },
  ],
  likes: [
    {
      username: String,
      createdAt: String,
    },
  ],
  retweets: [
    {
      username: String,
      createdAt: String,
    },
  ],

  user: {
    type: Schema.Types.ObjectId,
    ref: "users",
  },
});

const TweetModel = model<ITweetDocument>("Tweets", tweetSchema);

export { TweetModel, ITweetDocument };
