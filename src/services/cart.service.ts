import { Cart } from '../models/cart.models';
import { ICart } from '../types/cart.type';
import { Product } from '../models/product.models';
import { IProduct } from '../types/product.type';
import { ILineCart } from '../types/lineCart.type';


export const getCart = async (userId: string): Promise<ICart | null> => {
    return await Cart.findOne({ user: userId });
};

export const getOrcreateCart = async (userId: string): Promise<ICart> => {
    let cart = await Cart.findOne({ user: userId });
    if (!cart) {
        cart = await Cart.create({ user: userId });
    }

    return cart
}

/* export const updateCart = async (cartData: ICart): Promise<ICart | null> => {
    return await Cart.findOneAndUpdate(cartData);
}; */

//! funzionante ma nel db non vedo le chi prodotti
export const findProductToCart = async (cart: ICart, prodId: string): Promise<ILineCart | null> => {
    const product = cart.lineCart.find(item => item.productId === prodId);
    return product ? product : null;
};


export const addProductToCart = async (
    userId: string,
    product: IProduct,
    productQuantity: number
): Promise<ICart | null> => {
    let cart = await getOrcreateCart(userId);
    const productExist = cart.lineCart.find(item => item.productId == product._id);
    console.log("productExist: " + productExist)
    if(productExist) {
        productExist.quantity = productExist.quantity.valueOf() + productQuantity;
        productExist.subtotal = productExist.quantity.valueOf() * productExist.price.valueOf();
    } else{
        const populatedProduct = await Product.findById(product._id);
        cart.lineCart.push({
            productId: populatedProduct!._id,
            quantity: productQuantity,
            price: populatedProduct!.price,
            subtotal: productQuantity * populatedProduct!.price
        });
    }
    cart.totalPrice = cart.lineCart.reduce((total, item) => total + item.subtotal.valueOf(), 0);
    await cart.save();
    return cart;
}

// delete all products by one id in cart
export const removeProductToCart = async (cart: ICart, product: ILineCart): Promise<ICart | null> => {
    cart.lineCart = cart.lineCart.filter(
        (lineItem) => lineItem.productId !== product.productId
    );
    await cart.save();
    return cart;
}


export const clearCart = async (
    userId: string,
): Promise<ICart | null> => {
    return await Cart.findOneAndDelete({ user: userId });
}


