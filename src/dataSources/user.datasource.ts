import { Document } from "mongoose";
import { DataSource } from "apollo-datasource";
import { IUserDocument } from "../interfaces/user.interfaces";
import { UserModel } from "../models/user.model";
import { hash, compareSync } from "bcryptjs";
import { generateToken } from "../utils/validator";
import { sign, verify } from "jsonwebtoken";

export default class UserDatasources extends DataSource<IUserDocument> {
  constructor() {
    super();
  }

  async getUsers() {
    return await UserModel.find();
  }

  async getCurrentUser(token: string) {
    return await UserModel.findOne({ token: token });
  }

  async createUser(args) {
    // Extrac User, Pass
    const { username } = args;
    let { password } = args;
    // Hash password
    password = await hash(password, 12);

    // assign token
    const token = await generateToken(username);

    //search user before creation
    const isUser = await this.getUserbyUsername(username);
    if (isUser) {
      console.log("User Exist: ", isUser);
      return null;
    }

    //create
    return await UserModel.create({
      username,
      password,
      token,
      createdAt: new Date().toISOString(),
    });
  }

  async generateToken(user) {
    return await sign(
      {
        username: user.username,
      },
      "secret",
      { expiresIn: "1h" },
    );
  }

  // Login
  async validateLogin(username: string, password: string) {
    //find user
    const user = await this.getUserbyUsername(username);

    //exist?
    if (!user) return null;

    // compare hash
    if (!compareSync(password, user.password)) return null;

    //token
    const token = await this.generateToken(username);
    user.token = token;
    user.lastLogin = Date.now();
    await user.save();

    return user;
  }

  // Login Function
  async login(username: string, password: string) {
    return await this.validateLogin(username, password);
  }

  async getUserbyUsername(username) {
    return await UserModel.findOne({ username: username });
  }
}
