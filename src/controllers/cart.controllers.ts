import { Request, Response } from 'express';
import {
	getCart,
	addProductToCart,
	removeProductToCart,
	clearCart
} from '../services/cart.service';

// show all product by cart
export const getCartController = async (req: Request, res: Response) => {
    const userId = "66144d3ecd968b084ebe34c5"; // TODO recuperare id utente dal JWT token
	try {
        const cart = await getCart(userId);
        if (!cart) {
            return res.status(404).json({ success: false, error: 'Carrello non trovato' });
        }
        res.status(200).json({ success: true, data: cart });
    } catch (error) {
        console.error('Errore durante la gestione della richiesta del carrello:', error);
        res.status(500).json({ success: false, error: 'Errore durante la gestione della richiesta del carrello' });
    }
};

// add product in the cart
export const addProductToCartController = async (
	req: Request,
	res: Response
) => {
	const productId = req.params.id;
	const userId = req.body.userId; // TODO recuperare id utente dal JWT token
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
	req: Request,
	res: Response
) => {
	const productId= req.params.id;
	const userId =  "66144d3ecd968b084ebe34c5" // TODO associa id utente tramite token

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
export const clearCartController = async (req: Request, res: Response) => {
	const userId =  "66144d3ecd968b084ebe34c5" // TODO associa id utente tramite token
	try {
		await clearCart(userId);
		res.status(200).json({ message: "cart cleared" });
	} catch (error) {
		res.status(500).json({
			success: false,
			error: 'Error while removing cart',
		});
	}
};
