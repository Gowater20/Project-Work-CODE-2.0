import { Schema, Document } from "mongoose";
import { ILineCart } from "../types/lineCart.type";


export interface ICart extends Document{
    user: Schema.Types.ObjectId;
    lineCart:  ILineCart[];
    totalPrice: Number
}


    