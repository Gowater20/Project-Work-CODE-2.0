import { IProduct } from "../types/product.type";
import { Product } from "../models/product.models";

export const showAllProducts = async (): Promise<IProduct[]> => {
	return await Product.find();
};

export const showProduct = async (id: string): Promise<IProduct | null> => {
	return await Product.findById(id);
};

export const createProduct = async (product: IProduct): Promise<IProduct> => {
	return await Product.create(product);
};

export const upGrateProduct = async (id: string, updatedProduct: IProduct): Promise<IProduct | null> => {
	return await Product.findByIdAndUpdate(id, updatedProduct, { new: true });
}

export const deleteProduct = async (id: string): Promise<IProduct | null> => {
	return await Product.findByIdAndDelete(id);
};
