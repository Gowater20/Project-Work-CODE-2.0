import { Request, Response } from 'express';
import Cart from '../models/cart.models';
import { addCartToOrder, removeCartToOrder, showOrder } from '../services/order.service';


// show orders
export const getOrdersController = async (req: Request, res: Response) => {
	const userId = req.body.userId;
	try {
		const orders = await showOrder(userId);
		res.status(200).json({ success: true, data: orders });
	} catch (error) {
		res.status(500).json({
			success: false,
			error: 'Error while getting orders',
		});
	}
};

//TODO
// create new order from cart
/* export const createOrderController = async (req: Request, res: Response) => {
	//const { name, surname, address, city, region, state, postalCode} = req.body;

	try {
		const userCart = "6616a9ffca4167fcca78d422"
		//TODO inserisci dati dal token
		// TODO cerca carrello dall'utente loggato
		const cart = await Cart.findById(userCart)

		// Verifica se il carrello contiene prodotti
		if (!cart || cart.products.length === 0) {
			return res.status(400).json({ success: false, error: 'Cart is empty' });
		}
		// Create the new order
		const shipmentData = req.body;
		const newOrder = await addCartToOrder(cart, shipmentData );

		res.status(201).json({ success: true, order: newOrder });
	} catch (error) {
		console.error("Server not response for create order", error);
		res.status(500).json({ success: false, error: 'Errore durante la creazione dell\'ordine' });
	}
}; */


//TODO getOrderById
/*
export const getOrderByIdController = async (req: Request, res: Response) => {
	try {
		const orders = await getOrderByID(req.params.id);
		if (orders) {
			res.status(200).json(orders);
		} else {
			throw new Error("Order not found");
		}
	} catch {
		res.status(500).json({ success: false, error: 'Error while getting the order'});
	}
};
*/


//TODO upgradeStateOrder

export const removeOrderController = async (req: Request, res: Response) => {
	const orderId = req.params.id;
	try {
		await removeCartToOrder(orderId);
		res.status(200).json({ success: true });
	} catch (error) {
		res.status(500).json({
			success: false,
			error: 'Error while deleting order',
		});
	}
};
