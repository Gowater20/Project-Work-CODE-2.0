import Order from '../models/order.model';
import { ICart } from '../types/cart.type';
import { IOrder } from '../types/order.type';
import { findUserById } from './user.service';

export const showOrder = async (userId: string): Promise<IOrder[]> => {
	return await Order.find();
};

export const addCartToOrder = async (
	cartId: string,
	userId: string,
	infoData: {
		name: string,
		surname: string,
		address: string,
		city: string,
		region: string,
		state: string,
		postalCode: string
	}
): Promise<IOrder> => {
		const order: IOrder = await Order.create({ 
			cart: cartId, 
			userId: userId, 
			infoData: {
				name: infoData.name,
				surname: infoData.surname,
				address: infoData.address,
				city: infoData.city,
				region: infoData.region,
				state: infoData.state,
				postalCode: infoData.postalCode
			}
		});
		return order;
	}

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

