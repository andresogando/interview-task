import { DataSource } from "apollo-datasource";
import { ITweetDocument } from "../interfaces/tweets.interfaces";
import { TweetModel } from "../models/tweets.model";
import { UserModel } from "../models/user.model";
import UserDatasources from "./user.datasource";

export default class TweetsDatasources extends DataSource<ITweetDocument> {
  constructor() {
    super();
  }

  userContext = new UserDatasources();

  async getTweets() {
    return await TweetModel.find();
  }

  async getTweetsByUser(username) {
    return await TweetModel.find({ username: username });
  }

  async isTweetOwner(userId, id) {
    const tweet = await TweetModel.findById(id);
    if (tweet.user == userId) {
      console.log(tweet.user, userId);
      return true;
    } else {
      return false;
    }
  }

  async deleteTweet(id, token) {
    const tokenOwner = await this.userContext.getCurrentUser(token);

    if (await this.isTweetOwner(tokenOwner.id, id)) {
      const deleteTweet = await TweetModel.deleteOne({
        _id: id,
      });
      return deleteTweet;
    } else {
      return null;
    }
  }

  async createTweet({ args: { body, token } }) {
    const user = await this.userContext.getCurrentUser(token);

    return await TweetModel.create({
      body,
      username: user.username,
      user: user.id,
      createdAt: new Date().toISOString(),
    });
  }
}
