import { Router } from 'express';
import {
	createOrderController,
	getOrdersByUser,
	getOrderByIdController,
	upgrateStatusOrderController,
	removeOrderController
} from '../controllers/order.controllers';
import { JWTMiddleware } from '../middlewares/user.auth';
import { isAdmin } from '../middlewares/admin.auth';

export const router = Router();
//router.get('/admin', getOrdersController); // TODO estra, storico ordini di tutti gli utenti (only per admin)
router.get('/', JWTMiddleware, getOrdersByUser); // restituiscre tutti gli ordini di un utente specifico
router.post('/', JWTMiddleware, createOrderController); // crea nuovo ordine dai prodotti presenti nel carrello
router.get('/:id', JWTMiddleware, getOrderByIdController); // restituisce ordine dall'id order
router.put('/:id', JWTMiddleware, isAdmin, upgrateStatusOrderController); // aggiorna stato ordine (ADMIN) 
router.delete('/:id',JWTMiddleware, isAdmin, removeOrderController); // cancella stato ordine (ADMIN) solo se in stato cancelled
