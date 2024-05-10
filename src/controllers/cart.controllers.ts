import { Request, Response } from 'express';
import {
	getCart,
	addProductToCart,
	removeProductToCart,
	clearCart,
	getOrcreateCart,
	findProductToCart
} from '../services/cart.service';
import { ExtendedRequest } from '../middlewares/user.auth';
import { showProduct } from '../services/product.services';

// show all product by cart
export const getCartController = async (req: ExtendedRequest, res: Response) => {
	const userId = req.user?._id as string;
	try {
		const cart = await getCart(userId);
		if (!cart) {
			return res.status(404).json({ success: false, error: 'Cart not found' });
		}
		res.status(200).json({ success: true, data: cart });
	} catch (error) {
		res.status(500).json({ success: false, error: 'Server error while handling cart request' });
	}
};

// add product in the cart
export const addProductToCartController = async (
	req: ExtendedRequest,
	res: Response
) => {
	const productId = req.params.id;
	const userId = req.user?._id as string;
	try {
		if (productId.length !== 24) {
			return res.status(404).json({
				message: "Product id is not valid",
			})
		};
		const idProductDb = await showProduct(productId);
		if (!idProductDb) {
			return res.status(404).json({
				message: "Product id not found in the database",
			});
		}
		const cart = await addProductToCart(userId, idProductDb!);
		res.status(200).json({ success: true, data: cart });
	} catch (error) {
		console.log(error);
		res.status(500).json({
			success: false, error: 'Server error while handling cart request'
		});
	}
};

// remove product to cart
export const removeProductCartController = async (
	req: ExtendedRequest,
	res: Response
) => {
	const userId = req.user?._id as string;
	const productId = req.params.id;
	try {
		if (productId.length !== 24) {
			return res.status(404).json({
				message: "Product id is not valid",
			})
		}
		const productInCart = await findProductToCart(productId);
		if (!productInCart) {
			return res.status(404).json({
				message: "Product id not found in the cart",
			});
		}

		const cart = await getCart(userId);
		if (!cart) {
			return res.status(404).json({ success: false, error: 'User cart not found' });
		}
		const deletedProduct = await removeProductToCart(userId, productId);
		res.status(200).json({ success: true, data: deletedProduct }); // TODO inserisci carrello aggiornato
	} catch (error) {
		res.status(500).json({
			success: false,
			error: 'Error while removing product from cart',
		});
	}
};

// clear cart
export const clearCartController = async (req: ExtendedRequest, res: Response) => {
	const userId = req.user?._id as string;

	try {
		const cart = await getOrcreateCart(userId);
		if(cart.products.length === 0) {
			res.status(404).json({ message: 'Cart is empty' });
		}
		const emptyCart = await clearCart(userId);
		res.status(200).json({ message: "cart cleared", data: emptyCart });
	} catch (error) {
		res.status(500).json({
			success: false,
			error: 'Error while removing cart',
		});
	}
};