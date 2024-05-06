import { Router } from 'express';
import {
	createOrderController,
	getOrdersByUser,
	getOrderByIdController,
	//getOrderByIdController,
} from '../controllers/order.controllers';
import { JWTMiddleware } from '../middlewares/user.auth';

export const router = Router();
//router.get('/admin', getOrdersController); // TODO estra, storico ordini di tutti gli utenti (only per admin)
router.get('/', JWTMiddleware, getOrdersByUser); // restituiscre tutti gli ordini di un utente specifico
router.post('/', JWTMiddleware, createOrderController); // crea nuovo ordine dai prodotti presenti nel carrello
router.get('/:id', JWTMiddleware, getOrderByIdController); // restituisce ordine dall'id order

// TODO router.put('/:id', ); // aggiorna stato ordine (ADMIN)
// TODO router.delete('/:id', removeOrderController); // cancella stato ordine (ADMIN)
