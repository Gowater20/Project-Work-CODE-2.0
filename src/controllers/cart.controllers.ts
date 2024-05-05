import { Request, Response } from 'express';
import {
	getCart,
	addProductToCart,
	removeProductToCart,
	clearCart,
	getOrcreateCart
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
		// controlla se il prodotto esiste
		// cerca carrello o crea uno se non esiste
		// aggiunge prodotto al carrello
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
	//TODO testalo
	/* 	if(!productId){
			res.status(404).json({message: "product not found"})
		} */
	//const userId =  "66144d3ecd968b084ebe34c5" // TODO associa id utente tramite token


	try {
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
		const emptyCart = await clearCart(userId);
		res.status(200).json({ message: "cart cleared", data: emptyCart });
	} catch (error) {
		res.status(500).json({
			success: false,
			error: 'Error while removing cart',
		});
	}
};

/* export const addProductToCart = async (req: ExtendedRequest, res: Response) => {
	try {
		const userId = req.user?._id as string;
		const productId = req.params.id;

		// controlla se esiste il prodotto (dovrebbe restituire l'id del prodotto)
		const idProductDb = await showProduct(productId); 
		if (idProductDb) {
			return res.status(404).json({
				message: "Product not found",
			});
		}

		// Check for existing cart or create one
		const userCart = await getOrcreateCart(userId); // qui dovrei avere l'id del carrello utente
		if (userCart) {
			//lineIndex indicates the position of the product in the lines array of the cart
			const lineIndex = existingCart.lines.findIndex(
				(line: ILineItem) => line.productId === productId,
			);

			if (lineIndex !== -1) {
				existingCart.lines[lineIndex].quantity += 1; // Increment quantity by 1 if product already exists
			} else {
				existingCart.lines.push({
					productId: dbProductId,
					price: dbProductPrice,
					quantity: 1,
				});
			}

			const upCart = await updateCart(existingCart);

			if (!upCart) {
				return res.status(500).json({
					message: "Error updating cart",
				});
			}
			await generateSubtotal(userId);
			await generateTotalPrice(userId);
			await roundCartValues(userId);

			const userCart = await getUserCart(userId);
			if (userCart === null) {
				return res.status(404).json({ message: "Cart not found" });
			}
			const showCart: IFormattedCart = {
				_id: userCart._id,
				userId: userCart.userId,
				totalPrice: userCart.totalPrice,
				lines: userCart.lines.map((line) => ({
					productId: line.productId,
					quantity: line.quantity,
					price: line.price,
					subtotal: line.subtotal,
				})),
			};
			res.status(200).json({
				message: "Product quantity updated in cart",
				cart: showCart,
			});
		} else {
			//if productCart doesn't already exist, create a new cart
			const newCart: ICart = {
				userId,
				lines: [
					{
						productId: dbProductId,
						price: dbProductPrice,
						quantity: 1,
					},
				],
			};

			const createdCart = await addToUserCart(newCart);
			if (!createdCart) {
				return res.status(500).json({
					message: "Error creating cart",
				});
			}
			await generateSubtotal(userId);
			await generateTotalPrice(userId);
			await roundCartValues(userId);

			const userCart = await getUserCart(userId);
			if (userCart === null) {
				return res.status(404).json({ message: "Cart not found" });
			}
			const showCart: IFormattedCart = {
				_id: userCart._id,
				userId: userCart.userId,
				totalPrice: userCart.totalPrice,
				lines: userCart.lines.map((line) => ({
					productId: line.productId,
					quantity: line.quantity,
					price: line.price,
					subtotal: line.subtotal,
				})),
			};
			res.status(200).json({
				message: "Product added to cart",
				cart: showCart,
			});
		}
	} catch (error) {
		res.status(500).json({ message: "Internal server error" });
	} 
};*/