import { IProduct } from "../types/product.type";
import { Product } from "../models/product.models";

// trova tutti i prodotti dell'ecommerce
export const showAllProducts = async (): Promise<IProduct[]> => {
	return await Product.find();
};

//trova prodotto tramite id
export const showProduct = async (id: string): Promise<IProduct | null> => {
	return await Product.findById(id);
};

//trova prodotto tramite name e brand
export const findProductByName = async (product: IProduct): Promise<IProduct | null> => {
	return await Product.findOne({ name: product.name, brand: product.brand })
}

//crea un nuovo prodotto nel database
export const createProduct = async (product: IProduct): Promise<IProduct> => {
	return await Product.create(product);
};

export const upGrateProduct = async (id: string, updatedProduct: IProduct): Promise<IProduct | null> => {
	return await Product.findByIdAndUpdate(id, updatedProduct, { new: true });
}

export const deleteProduct = async (id: string): Promise<IProduct | null> => {
	//const product = await Product.findById(id)
	//if (!product) { return (`Product ${id} not found`) }
	return await Product.findByIdAndDelete(id);
};
