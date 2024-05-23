import { Request, Response } from 'express';
import {
	getCart,
	addProductToCart,
	clearCart,
	getOrcreateCart,
	findProductToCart,
	removeProductToCart
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
	let quantity = req.body.quantity; // recupero la quantità dal body
	try {
		const productDb = await showProduct(productId);
		if (!productDb) {
			return res.status(404).json({
				message: "Product id not found in the database",
			});
		}
		if(quantity === undefined) {
			quantity = 1;
		}
// TODO controllo quantità dallo stock
// TODO riduci quantità dallo stock se l'ordine viene venduto

		// Pass quantity to addProductToCart function
		const cart = await addProductToCart(userId, productDb!, quantity);
		res.status(200).json({ success: true, data: cart });
	} catch (error) {
		console.log(error);
		res.status(500).json({
			success: false,
			error: 'Server error while handling cart request',
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
		const cart = await getCart(userId);
		if (!cart) {
			return res.status(404).json({ success: false, error: 'User cart not found' });
		}
		console.log("cartId: " + cart._id)
		const productInCart = await findProductToCart(cart, productId);
		console.log("product in lineCart: " + productInCart)
		if (!productInCart) {
			return res.status(404).json({
				message: "Product id not found in the cart",
			});
		}

		
		const deletedProduct = await removeProductToCart(cart, productInCart);
		res.status(200).json({ success: true, message: "product deleted" }); // TODO inserisci carrello aggiornato
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
        const cart = await getCart(userId);
        if (!cart || cart.lineCart.length === 0) {
            return res.status(404).json({ message: 'Cart is empty' });
        }

        const emptyCart = await clearCart(userId);
        res.status(200).json({ message: "Cart cleared" });
    } catch (error) {
        res.status(500).json({
            success: false,
            error: 'Error while removing cart',
        });
    }
};
