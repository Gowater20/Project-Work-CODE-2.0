import { Router } from 'express';
import {
	
	getOrdersController,
	createOrderController,
	removeOrderController,
	getOrdersByUser,
	//getOrderByIdController,
} from '../controllers/order.controllers';
import { JWTMiddleware } from '../middlewares/user.auth';

export const router = Router();
//router.get('/admin', getOrdersController); // TODO estra, storico ordini di tutti gli utenti (only per admin)
router.get('/', JWTMiddleware, getOrdersByUser); // restituiscre tutti gli ordini di un utente specifico
router.post('/', JWTMiddleware, createOrderController); // crea nuovo ordine dai prodotti presenti nel carrello
// TODO router.get('/:id', getOrderByIdController); // restituisce ordine dall'id order

// TODO router.put('/:id', ); // aggiorna stato ordine (ADMIN)
router.delete('/:id', removeOrderController); // cancella stato ordine (ADMIN)
