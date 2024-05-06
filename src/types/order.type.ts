import { Schema } from 'mongoose';

export interface IOrder{
    _id?: string;
    userId: string;
    cart: Schema.Types.ObjectId;
    status: string;
    //TODO status
    infoData?: {
        name: string,
        surname: string,
        address: string;
        city: string;
        region: string;
        state: string;
        postalCode: string;
    }
    createdAt?: Date;
    updatedAt?: Date;
}
