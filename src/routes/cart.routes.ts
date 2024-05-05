import { Router } from 'express';

import {
	addProductToCartController,
	getCartController,
	clearCartController,
	removeProductCartController,
} from '../controllers/cart.controllers';
import { JWTMiddleware } from '../middlewares/user.auth';

export const router = Router();

router.get('/', JWTMiddleware, getCartController); // get all products by cart
router.post('/add/:id', JWTMiddleware, addProductToCartController); // add product to cart
router.delete('/remove/:id', JWTMiddleware, removeProductCartController); // remove product from cart
router.delete('/clear', JWTMiddleware, clearCartController); // remove all products from cart
