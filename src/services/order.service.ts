import Order from '../models/order.model';
import { ICart } from '../types/cart.type';
import { IOrder } from '../types/order.type';
import { findUserById } from './user.service';

// for all orders //TODO (admin only)
export const showOrder = async (userId: string): Promise<IOrder[]> => {
	return await Order.find();
};

// for one user
export const findOrdersByUserId = async (userId: string): Promise<IOrder[]> => {
	return await Order.find({ userId });
}

// display the order indicated by id
export const findOrderById = async (id: string): Promise<IOrder | null> => {
	return await Order.findById(id);
}

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

// update status order by id (only admin)
export const upgrateOrder = async (orderId: string, updatedOrder: IOrder): Promise<IOrder | null> => {
	return await Order.findOneAndUpdate(
		{ _id: orderId },
		{ status: updatedOrder },
		{ new: true });
}

//delete order by id (only admin)
export const deleteOrder = async (orderId: string): Promise<void> => {
	await Order.findByIdAndDelete(orderId);
}

