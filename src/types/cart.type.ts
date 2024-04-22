import { Schema, Document } from "mongoose";
import { IProduct } from "./product.type";
export interface ICart extends Document {
    user: Schema.Types.ObjectId;
    products: Array<IProduct>;
}

