import { Request, Response } from 'express';
import {
	getCart,
	addProductToCart,
	removeProductToCart,
	clearCart
} from '../services/cart.service';
import { ExtendedRequest } from '../middlewares/user.auth';

// show all product by cart
export const getCartController = async (req: ExtendedRequest, res: Response) => {
	const userId = req.user?._id as string;
	try {
        const cart = await getCart(userId);
        if (!cart) {
            return res.status(404).json({ success: false, error: 'Carrello non trovato' });
        }
        res.status(200).json({ success: true, data: cart });
    } catch (error) {
        res.status(500).json({ success: false, error: 'Errore durante la gestione della richiesta del carrello' });
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
		const cart = await addProductToCart(userId, productId);
		res.status(200).json({ success: true, data: cart });
	} catch (error) {
		console.log(error);
		res.status(500).json({
			success: false,
			error: 'Error while adding product to cart',
		});
	}
};

// remove product to cart
export const removeProductCartController = async (
	req: ExtendedRequest,
	res: Response
) => {
	const userId = req.user?._id as string;
	const productId= req.params.id;
	//TODO testalo
/* 	if(!productId){
		res.status(404).json({message: "product not found"})
	} */
	//const userId =  "66144d3ecd968b084ebe34c5" // TODO associa id utente tramite token
	

	try {
		const deletedProduct = await removeProductToCart(userId, productId);
		res.status(200).json({ success: true, data: deletedProduct}); // TODO inserisci carrello aggiornato
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
		const emptyCart = await clearCart(userId);
		res.status(200).json({ message: "cart cleared", data: emptyCart });
	} catch (error) {
		res.status(500).json({
			success: false,
			error: 'Error while removing cart',
		});
	}
};

