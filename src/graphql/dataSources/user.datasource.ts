import { Document } from "mongoose";
import { DataSource } from "apollo-datasource";
import { IUserDocument } from "../../interfaces/user.interfaces";
import { UserModel } from "../../models/user.model";
import { hash } from "bcryptjs";
import { generateToken } from "../../utils/validator";

export default class UserDatasources extends DataSource<IUserDocument> {
  constructor() {
    super();
  }

  async getUsers() {
    return await UserModel.find();
  }

  async createUser(args) {
    // Extrac User, Pass
    const { password, username } = args;

    // Hash password
    password = await hash(password, 12);

    // assign token
    const token = await generateToken(username);

    //create
    return await UserModel.create({
      username,
      password,
      token,
      createdAt: new Date().toISOString(),
    });
  }

  async getUserbyUsername(username) {
    return await UserModel.findById({ username: username });
  }
}
