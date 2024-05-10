import { createProduct, deleteProduct, showAllProducts, showProduct, upGrateProduct, findProductByName } from "../services/product.services";
import { IProduct } from "../types/product.type";
import { Request, Response } from "express";

export const getProductsController = async (req: Request, res: Response) => {
	try {
		const products = await showAllProducts();
		if (!products || products.length === 0) {
			return res.status(404).json({
				success: false,
				error: 'No products found',
			});
		}
		res.status(200).json(products);
	} catch (error) {
		res.status(500).json({
			success: false,
			error: 'Server error while getting products',
		});
	}
}


export const getProductByIdController = async (req: Request, res: Response) => {
	try {
		const products = await showProduct(req.params.id);
		if (!products) {
			return res.status(404).json({
				success: false,
				error: 'No product found',
			});
		}
		res.status(200).json(products);
	} catch {
		res.status(500).json({
			success: false,
			error: 'Server error while getting product',
		});
	}
};

export const addProductController = async (req: Request, res: Response) => {
	const product = req.body;
	try {
		const newProduct = await findProductByName(product);
		if (newProduct) {
			return res.status(404).json({ message: "Product already exists in the database" });
		}
		const createdProduct = await createProduct(product);
		res.status(200).json({
			message: "product added successfully",
			createdProduct
		});
	} catch (error) {
		res.status(500).json({ error: 'Server error while adding product' });
	}
};

export const updateProductController = async (req: Request, res: Response) => {
	try {
		let updatedProduct: IProduct = req.body;
		const product = await upGrateProduct(req.params.id, updatedProduct);
		if (!product) {
			return res.status(404).json({ message: "Product not found in the database" });
		}
		res.status(200).json({ message: "Product successfully modified", product });
	} catch (error) {
		res.status(500).json({ message: "Server error while updating product" });
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
		res.status(500).json({
			success: false,
			error: 'Server error while deleting product'
		});
	}
}