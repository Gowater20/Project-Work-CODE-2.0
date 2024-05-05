import { createProduct, deleteProduct, showAllProducts, showProduct, upGrateProduct, } from "../services/product.services";
import { IProduct } from "../types/product.type";
import { Request, Response } from "express";

export const getProductsController = async (req: Request, res: Response) => {
	try {
		const products = await showAllProducts();
		res.status(200).json(products);
	} catch (error) {
		res.status(500).json({
			success: false,
			error: 'Error while getting products',
		});
	}
};

export const getProductByIdController = async (req: Request, res: Response) => {
	try {
		const products = await showProduct(req.params.id);
		if (products) {
			res.status(200).json(products);
		} else {
			throw new Error();
		}
	} catch {
		res.status(404).json({
			success: false,
			error: 'Product not found',
		});
	}
};

export const addProductController = async (req: Request, res: Response) => {
	try {
		const newProduct: IProduct | string = await createProduct(req.body);
		if (typeof newProduct === 'string') {
			return res.status(400).json({ error: newProduct });
		}
		res.status(200).json({
			message: "product added successfully",
			newProduct,
		});
	} catch (error) {
		res.status(400).json({ error: 'Not all requiredfields were filled out' });
	}
};

export const updateProductController = async (req: Request, res: Response) => {
	try {
		let updatedProduct: IProduct = req.body;
		const product = await upGrateProduct(req.params.id, updatedProduct);
		res.status(200).json({ message: "Product successfully modified", product });
	} catch (error) {
		res.status(404).json({ message: "Product not found in database" });
	}
};

export const deletedProductController = async (req: Request, res: Response) => {
	try {
		const product = await deleteProduct(req.params.id);
		if (!product) {
			return res.status(404).json({ message: "Product not found inside the database" });
		}
		return res.status(200).json({ message: "Product deleted" });
	} catch (errore) {
		res.status(404).json({
			success: false,
			error: 'Product not found',
		});
	}
}