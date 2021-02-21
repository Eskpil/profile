import { Document, model, Schema } from "mongoose";

interface UserModel extends Document {
    _id: string;
    username: string;
    email: string;
    avatar: string;
    createdAt: Date;
}

export const User = model<UserModel>(
    "user",
    new Schema({
        _id: String,
        username: String,
        email: String,
        avatar: String,
        createdAt: { type: Date, default: new Date() },
    })
);
