import { Document, Types } from "mongoose";

export interface IUser extends Document {
  _id: Types.ObjectId | string;
  email: string;
  fullName: string;
  password: string;
  profilePic: string;
}

declare global {
  namespace Express {
    interface Request {
      user?: IUser;
    }
  }
}

