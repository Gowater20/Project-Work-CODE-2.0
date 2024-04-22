import Order from '../models/order.model';
import { ICart } from '../types/cart.type';
import { IOrder } from '../types/order.type';

export const showOrder = async (userId: string): Promise<IOrder[]> => {
	try {
		const orders = await Order.find();
		return orders;
	} catch (error) {
		throw new Error('Error while fetching orders');
	}
};

export const addCartToOrder = async (
	cartId: string,
	infoData: object
): Promise<ICart | any> => {
	try {
		const order = await Order.create( {cart: cartId} , infoData );
		return order;
	} catch (error) {
		console.error("Order not created", error);
		return null;
	}
};

// TODO service for GETById
/*export const getOrderById = async (id: string): Promise<IOrder | null> => {
	return await Order.findById(id);
};
*/

// TODO service for upgradeStateOrder by id

export const removeCartToOrder = async (orderId: string): Promise<void> => {
	try {
		await Order.findByIdAndDelete(orderId);
	} catch (error) {
		throw new Error('Error while removing order');
	}
};

