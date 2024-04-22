import mongoose, { Schema, Document } from 'mongoose';
import { IOrder } from '../types/order.type';
import { ICart } from '../types/cart.type';
const orderSchema = new Schema<IOrder>(
    {
        cart: { type: Schema.Types.ObjectId, ref: 'Cart', required: true },
        // TODO status: { type: String, default: 'pending' },
        infoData: {
            name: { type: String, required: false },
            surname: { type: String, required: false },
            address: { type: String, required: false },
            city: { type: String, required: false},
            region: { type: String, required: false },
            state: { type: String, required: false },
            postalCode: { type: String, required: false }
        }
    },
    { timestamps: true }
);

// Modello per l'ordine
const Order = mongoose.model<IOrder>('Order', orderSchema);

export default Order;
