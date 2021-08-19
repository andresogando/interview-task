import mongoose, { Schema, model } from "mongoose";
import { IUserDocument } from "../interfaces/user.interfaces";

const schema = new Schema<IUserDocument>(
  {
    username: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    createdAt: { type: String },
    token: { type: String, required: true },
    lastLogin: { type: String },
  },
  {
    timestamps: true,
  },
);

const UserModel = model<IUserDocument>("User", schema);

export { UserModel, IUserDocument };
