import { Request, Response } from 'express';
import Cart from '../models/cart.models';
import { addCartToOrder, findOrderById, findOrdersByUserId, removeCartToOrder, showOrder } from '../services/order.service';
import { ICart } from '../types/cart.type';
import { ExtendedRequest } from '../middlewares/user.auth';
import { getCart } from '../services/cart.service';


// TODO Extra: show orders by all users (only admin)
/* 
export const getOrdersController = async (req: ExtendedRequest, res: Response) => {
	const userId = req.user?._id as string;
	try {
		const orders = await showOrder(userId);
		res.status(200).json({ success: true, data: orders });
	} catch (error) {
		res.status(500).json({
			success: false,
			error: 'Error while getting orders',
		});
	}
}; */


// Displays all orders of a specific user
export const getOrdersByUser = async (req: ExtendedRequest, res: Response) => {
	// cerca user id;
	// cerca ordini specifici dell'user;
	// se no ordini, return nessun ordine
	// restituisci tutti ordini;
	const userId = req.user?._id as string;
	try {
		const orders = await findOrdersByUserId(userId);
		if (!orders) {
			return res.status(404).json({ success: false, error: 'No orders found' });
		}
		res.status(200).json({ success: true, data: orders });
	} catch (error) {
		res.status(500).json({ success: false, error: 'Server error while getting orders' });
	}
}

// create new order from user cart
export const createOrderController = async (req: ExtendedRequest, res: Response) => {
	const { name, surname, address, city, region, state, postalCode } = req.body;
	let cart: ICart | null;
	try {
		const userId = req.user?._id as string;
		const cartObj = await getCart(userId);
		const cartId = cartObj?._id.toString();
		// Verifica se il carrello contiene prodotti
		if (!cartObj || cartObj.products.length === 0) {
			return res.status(400).json({ success: false, error: 'Cart is empty' });
		}

		const shipmentData = {
			name,
			surname,
			address,
			city,
			region,
			state,
			postalCode
		};
		//TODO
		/* calcolo il totale dell'ordine (somma dei prezzi dei prodotti nel carrello)
		il calcolo deve essere effettuato nel carrello e riportato negli ordini
		crea nuovo ordine */
		const newOrder = await addCartToOrder(cartId, userId, shipmentData);

		// elimina il carrello (alternativa sarebbe svuota il carrello in modo da non crearne degli altri ogni volta)
		await Cart.findByIdAndDelete(cartId);

		res.status(201).json({ success: true, order: newOrder });
	} catch (error) {
		res.status(500).json({ success: false, error: "Server not response for create order" });
	}
};

// display the order indicated by id
export const getOrderByIdController = async (req: ExtendedRequest, res: Response) => {
	const userId = req.user?._id as string;
	const orderId = req.params.id;
	try {
		const arrayOrders = await findOrdersByUserId(userId);
		if (!arrayOrders) {
			return res.status(404).json({ success: false, error: 'No orders found' });
		}
		const order = arrayOrders.find(order => order._id?.toString() === orderId);
		if (!order) {
			return res.status(404).json({ success: false, error: 'Order not found' });
		}
		res.status(200).json(order);
	} catch {
		res.status(500).json({ success: false, error: 'Error while getting the order'});
	}
};


//TODO upgradeStateOrder

/* export const removeOrderController = async (req: Request, res: Response) => {
	// 
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
}; */
