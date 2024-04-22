// TODO jwt.verify token
import { Request, Response, NextFunction } from "express";
import jwt, { JwtPayload } from "jsonwebtoken";
import dotenv from 'dotenv'
dotenv.config()
const SECRET = process.env.JWT_SECRET;

/* export const VerifyToken = (req: Request, res: Response, next: NextFunction) => {
	const token = req.headers.authorization?.split(" ")[1];
	console.log("token", token);
    console.log("il segreto è: "+ SECRET);

	if (!token) {
		return res.status(401).json({ message: "Token not provided" });
	}

	try {
		// Verifica e decodifica il token, tira fuori il payload. Tipizzarlo con il Payload corretto
		const decodedToken: any = jwt.verify(token, SECRET!);
        return decodedToken;
		next();
	} catch (err) {
		return res.status(401).json({ message: "Invalid token" });
	}
}; */


//_________________________________________

// Estendi l'interfaccia Request per includere la proprietà user
declare global {
    namespace Express {
        interface Request {
            user?: any; // Puoi definire il tipo di user come preferisci
        }
    }
}

// Middleware per estrarre e memorizzare le informazioni dell'utente dalla richiesta
/* export function idTokenMiddleware(req: Request, res: Response, next: NextFunction) {
    try {
        // Ottieni il token JWT dalla richiesta
        const token = req.headers.authorization?.split(' ')[1];
        console.log("ecco il token: " + token);
        console.log("chiave segreta: " + SECRET);
        if (token) {
            // Verifica e decodifica il token
            const decodedToken = verifyToken(token);
            console.log("token decodificato" + decodedToken)
            // Assegna le informazioni dell'utente alla richiesta
            req.user = decodedToken;
        }
        next();
    } catch (error) {
        res.status(401).json({ message: 'Invalid token dentro il middleware' });
    }
} */


// Funzione per verificare e decodificare il token JWT
export function verifyToken(token: string): any {
    try {
        const decoded = jwt.verify(token, SECRET!);
        console.log("dedoded: "+ decoded)
        return decoded;
    } catch (error) {
        throw new Error('Invalid token!!!');
    }
} 