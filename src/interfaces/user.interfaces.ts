import { Document } from "mongoose";

export interface IUserDocument extends Document {
  id: String;
  username: String;
  password: String;
  token: String;
  errors: [String];
  valid: Any;
}
