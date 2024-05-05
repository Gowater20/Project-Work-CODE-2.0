import Cart from '../models/cart.models';
import { ICart } from '../types/cart.type';
import { Product } from '../models/product.models';
import { IProduct } from '../types/product.type';


export const getCart = async (userId: string): Promise<ICart | null> => {
    return await Cart.findOne({ user: userId });
};

export const getOrcreateCart = async (userId: string): Promise<ICart> => {
    const cart = await Cart.findOne({ user: userId });
    return cart || await Cart.create({ user: userId, products: [] });
}

export const findProductToCart = async (id: string): Promise<ICart | null> => {
	return await Cart.findById(id);
};
export const addProductToCart = async (
    userId: string,
    product: IProduct
): Promise<ICart | null> => {
    let cart = await getOrcreateCart(userId);
    cart.products.push(product);
    await cart.save();

    return cart;
};
// qui non dovremmo puntare l'id del carrello bensi il carrello dell'utente. capisci meglio la logica
/* export const updateCart = async (cartData: ICart): Promise<ICart | null> => {
    const { _id, ...updateData } = cartData; // Escludi il campo _id dal dato da aggiornare
    return await Cart.findByIdAndUpdate(_id, updateData, { new: true });
}; */

/* export const findProductToCart = async (
    userId: string,
) */
export const removeProductToCart = async (
    userId: string,
    productId: string
): Promise<ICart | null> => {
    let cart = await getCart(userId);
    cart!.products.pull(productId); //TODO risolvi errore da IProduct
    await cart!.save();
    return cart;
};

export const clearCart = async (
    userId: string,
): Promise<ICart | null> => {
    try {
        let userCart = await Cart.findOne({ user: userId });
        if (!userCart) {
            throw new Error("Carrello non trovato");
        }

        userCart.products = [];

        await userCart.save();

        return userCart;
    } catch (error) {
        console.error("Errore durante la rimozione dei prodotti all'interno del carrello:", error);
        return null;
    }
};