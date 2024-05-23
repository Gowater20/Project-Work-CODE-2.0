import mongoose from "mongoose";
import { Schema } from "mongoose";
import { ICart } from "../types/cart.type";
import { lineCartSchema } from "./lineCart.model";


export const cartSchema = new mongoose.Schema<ICart>({
    user: { type: Schema.Types.ObjectId },
    lineCart: [
        {
            type: lineCartSchema,
            ref: "LineCart",
        },
    ],
    totalPrice: {
        type: Number,
    }
}, { timestamps: true });

export const Cart = mongoose.model<ICart>("Cart", cartSchema);