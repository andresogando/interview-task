import { Document } from "mongoose";

export interface IUserDocument extends Document {
  id: string;
  username: string;
  password: string;
  token: string;
}
