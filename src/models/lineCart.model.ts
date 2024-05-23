import mongoose from 'mongoose';
import { ILineCart } from "../types/lineCart.type";

export const lineCartSchema = new mongoose.Schema<ILineCart>({
    productId: {
        type: String,
        required: true,
    },
    quantity: {
        type: Number,
        required: true
    },
    price: {
        type: Number,
        required: true
    },
    subtotal: {
        type: Number,
        required: true
    },
}, { timestamps: true });

export const LineCart = mongoose.model<ILineCart>('LineCart', lineCartSchema);


