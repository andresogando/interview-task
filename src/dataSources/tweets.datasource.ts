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

  //QUERY ALL
  async getTweets() {
    return await TweetModel.find();
  }

  //QUERY BY USER
  async getTweetsByUser(username) {
    return await TweetModel.find({ username: username });
  }

  // is Tweet Owner?
  async isTweetOwner(userId, id) {
    const tweet = await TweetModel.findById(id);
    if (tweet.user == userId) {
      console.log(tweet.user, userId);
      return true;
    } else {
      return false;
    }
  }

  //DELETE
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

  //CREATE
  async createTweet({ args: { body, token } }) {
    const user = await this.userContext.getCurrentUser(token);

    return await TweetModel.create({
      body,
      username: user.username,
      user: user.id,
      createdAt: new Date().toISOString(),
    });
  }

  //UPDATE

  async updateTweet(args: { id: string; body: any; token: any }) {
    const { id, body, token } = args;
    const tokenOwner = await this.userContext.getCurrentUser(token);

    const isValid = await this.isTweetOwner(tokenOwner.id, id);

    if (isValid) {
      const tweet = await TweetModel.findById(id);
      const updated = await tweet.updateOne({ body: body });
      tweet.save();

      return updated;
    } else {
      return null;
    }
  }
}
