import mongoose, { Schema, model } from "mongoose";

const schema = new Schema(
  {
    username: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    createdAt: String,
  },
  {
    timestamps: true,
  }
);

const UserModel = model("User", schema);

export { UserModel };
