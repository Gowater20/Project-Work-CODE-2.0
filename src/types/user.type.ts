import { Schema } from "mongoose";
export interface IUser {
    _id?: String,
    name: String;
    surname: String;
    email: string;
    password: string;
    cart?: Schema.Types.ObjectId;
    birthdate: string;
    role: string;
}