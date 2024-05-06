import { Router } from 'express';
import {
	
	getOrdersController,
	createOrderController,
	removeOrderController,
	//getOrderByIdController,
} from '../controllers/order.controllers';
import { JWTMiddleware } from '../middlewares/user.auth';

export const router = Router();
router.get('/', getOrdersController); // storico ordini utente loggato
//TODO 
router.post('/', JWTMiddleware, createOrderController); // crea nuovo ordine dai prodotti presenti nel carrello
// TODO router.get('/:id', getOrderByIdController); // restituisce ordine dall'id order

// TODO router.put('/:id', ); // aggiorna stato ordine (ADMIN)
router.delete('/:id', removeOrderController); // cancella stato ordine (ADMIN)
