import { Request, Response } from 'express';
import Cart from '../models/cart.models';
import { addCartToOrder, removeCartToOrder, showOrder } from '../services/order.service';
import { ICart } from '../types/cart.type';


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
export const createOrderController = async (req: Request, res: Response) => {
	//const { name, surname, address, city, region, state, postalCode} = req.body;
	let cart: ICart | null;
	try {
		const cartId = req.body.cartId;
		//TODO inserisci dati dal token
		// TODO cerca carrello dall'utente loggato
		cart = await Cart.findById(cartId)

		// Verifica se il carrello contiene prodotti
		if (!cart || cart.products.length === 0) {
			return res.status(400).json({ success: false, error: 'Cart is empty' });
		}
		// Creo dati spedizioni per l'ordine
		// recuperando i dati della richiesta 
		// nome, cognome, indirizzo, etc.
		const shipmentData = req.body;

		//calcolo il totale dell'ordine (somma dei prezzi dei prodotti nel carrello)
		// il calcolo deve essere effettuato nel carrello e riportato negli ordini
		//crea nuovo ordine
		const newOrder = await addCartToOrder(cartId, shipmentData );

		// elimina il carrello (alternativa sarebbe svuota il carrello in modo da non crearne degli altri ogni volta)
		await Cart.findByIdAndDelete(cartId);


		res.status(201).json({ success: true, order: newOrder });
	} catch (error) {
		console.error("Server not response for create order", error);
		res.status(500).json({ success: false, error: 'Errore durante la creazione dell\'ordine' });
	}
};


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
