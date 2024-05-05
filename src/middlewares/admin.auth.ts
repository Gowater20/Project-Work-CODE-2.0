import { NextFunction, Response } from 'express';
import { ExtendedRequest } from './user.auth';
import { findUserById } from '../services/user.service';

export const isAdmin =	async (req: ExtendedRequest, res: Response, next: NextFunction) => {
		const adminOrUserId = req.user?._id as string; // controlla se serve toString()
		console.log(adminOrUserId) // recupero l'id dell'admin o dell'utente)
		try {
			const adminOrUserInDb = await findUserById(adminOrUserId);
			if (!adminOrUserInDb) {
				return res
					.status(401)
					.json({ message: 'Unauthorized: User not found' });
			}

			if (adminOrUserInDb.role !== 'admin') {
				return res
					.status(403)
					.json({ message: 'Forbidden: Insufficient permissions' });
			} 

			// admin is authorized, proceed with the request
			next();
		} catch (error) {
			return res.status(500).json({ message: 'Internal Server Error' });
		}
	};


/* pseudo codice:
- recupera id tramite extended request
- controlla autenticazione 
- cerca se esiste l'id in db (indipendentemente se admin o user)
- controllo ruolo
- se admin concedo i permessi
- altrimenti errore */