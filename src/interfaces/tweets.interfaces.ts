import { document } from "mongoose";

export interface ITweetDocument extends Document {
  body: string;
  username: string;
  createdAt: string;
  comments: [Array];
  likes: [Array];
  retweets: [Array];
  user: string;
}
