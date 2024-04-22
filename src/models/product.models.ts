import mongoose from 'mongoose';
import { IProduct } from "../types/product.type";

const productSchema = new mongoose.Schema<IProduct>(
	{
		name: {
			type: String,
			required: true,
		},
		brand: {
			type: String,
			required: true,
		},
		quantity: {
			type: Number,
			required: true,
		},
		price: {
			type: Number,
			required: true,
		},
		sale: {
			type: Number,
			required: true,
		},
	},
	{ timestamps: true }
);

export const Product = mongoose.model("Product", productSchema);
