import Cart from '../models/cart.models';
import { ICart } from '../types/cart.type';
import { Product } from '../models/product.models';
import { IProduct } from '../types/product.type';


export const getCart = async (userId: string): Promise<ICart | null> => {
    try {
        const cart = await Cart.findOne({ user: userId });
        return cart;
    } catch (error) {
        console.error('Errore durante il recupero del carrello:', error);
        throw new Error('Errore durante il recupero del carrello');
    }
};

export const addProductToCart = async (
    userId: string,
    productId: string
): Promise<ICart | null> => {
    let cart = await Cart.findOne({ user: userId });
    if (!cart) {
        cart = await Cart.create({
            user: userId,
            products: [],
        })
    }
    const product = await Product.findById(productId);
    if (!product) {
        throw new Error("Product not found");
    }

    cart.products.push(product);
    await cart.save();

    return cart;
};

export const removeProductToCart = async (
    userId: string,
    productId: string
): Promise<ICart | null> => {
        let cart = await Cart.findOne({ user: userId });
        if (!cart) {
            throw new Error("Carrello non trovato");
        }

        cart.products.pull(productId); //TODO risolvi errore da IProduct
        await cart.save();
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