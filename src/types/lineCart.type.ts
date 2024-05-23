import { Schema } from "mongoose";

export interface ILineCart {
    productId: String,
    quantity: Number,
    price: Number,
    subtotal: Number
}

