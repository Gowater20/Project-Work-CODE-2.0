import mongoose from 'mongoose';
import { ICart } from '../types/cart.type';

const cartSchema = new mongoose.Schema<ICart>(
    {
        user: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            required: true,
        },
        products: [{ 
            type: mongoose.Schema.Types.ObjectId, 
            ref: 'Product', 
            required: true,
        }],
    },
    { timestamps: true }
);

const Cart = mongoose.model<ICart>('Cart', cartSchema);

export default Cart;
