// TODO jwt.verify token
import { Request, Response, NextFunction } from "express";
import jwt, { JwtPayload } from "jsonwebtoken";
import dotenv from 'dotenv'
dotenv.config()
const secretKey = process.env.JWT_SECRET;


/* - prendo il jwt dagli headers splittando il bearer e tenendo solo il paypload
- controllo se c'è il token con (!token) = errore;
 - verifico e decodifico il jwt
 - se c'è il token, assegno le informazioni dell'utente alla richiesta come extend request

 -  */



// Interface for decoded _id by token 
export interface ExtendedRequest extends Request {
    user?: { _id: string };
}

// mio controller for show user logged
export const JWTMiddleware = async (
    req: ExtendedRequest,
    res: Response,
    next: NextFunction,) => {
    try {
        const bearerToken = req.headers.authorization?.split(" ")[1];
        console.log("bearerToken già splittato: " + bearerToken)
        if (!bearerToken) {
            return res.json({ status: "Unauthorized: there is no bearer token" });
        }
        const decodedToken = jwt.verify(bearerToken, secretKey!) as jwt.JwtPayload;
        req.user = { _id: decodedToken.id } as ExtendedRequest["user"];
        next();
    }
    catch (err: any) {
        return res.status(500).json({ message: "Internal Server Error", error: err.message });
    }
};
