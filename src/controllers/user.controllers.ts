import { Request, Response } from 'express';
import { registerUser, matchUser, findUserById } from '../services/user.service';
import { IUser } from '../types/user.type';
import { createSecretToken } from '../utils/user.utils';
const jwt = require("jsonwebtoken");

import dotenv from 'dotenv'
//import { idTokenMiddleware } from '../middlewares/user.auth';
dotenv.config()
const secretKey = process.env.JWT_SECRET;

export const Signup = async (req: Request, res: Response) => {
    try {
        const newUser: IUser = req.body;
        const userCreated: IUser = await registerUser(newUser);
        return res.status(200).json({ userCreated });
    } catch (err: any) {
        return res.status(400).json({ error: err.message });
    }
};

// TODO admin register

export const Login = async (req: Request, res: Response) => {
    try {
        const { email, password } = req.body;
        const user = await matchUser(email, password);
        if (!user) {
            return res.status(400).json({ message: "Wrong email or password" });
        }

        const secretKey = process.env.JWT_SECRET;

        if (!secretKey) {
            throw new Error('JWT secret key not valid');
        }
        console.log("questa è la mail trovataaaaaaaaaaaaaaaaaa: " + email)

        const userId = user._id?.toString();
        console.log("questo è l'id associato alla maillllll: " + userId)

        if (userId) {
            const token = createSecretToken({
                id: user._id,
                email: user.email,
                role: user.role
            }, 1)
            res.cookie("token", token, {
                httpOnly: false,
                //TODO aggiungi altri sistemi di sicurezza
                //TODO aggiungi refresh token 
            });
            console.log("token login: " + token);
            res
                .status(201)
                .json({ message: "User logged", success: true });
        }
    } catch (err: any) {
        return res.status(500).json({ error: err.message });
    }
};

export const Logout = async (req: Request, res: Response) => {
    try {
        res.clearCookie("token");
        res
            .status(200)
            .json({ message: "User logged out successfully", success: true });
    } catch (err: any) {
        return res.status(500).json({ error: err.message });
    }
};

// TODO getUserLogged
/* export const getUserLogged = async (req: Request, res: Response) => {
    const token = req.headers.authorization;
    console.log(token);
    try {
        // Controlla se le informazioni dell'utente sono state memorizzate nell'oggetto req
        if (req.user && req.user.id) {
            const user = await findUserById(req.user.id);
            console.log("sono nell'user del controller"+user);
            if (user) {
                return res.json({ status: true, user: user.surname });
            } else {
                return res.json({ status: false });
            }
        } else {
            return res.json({ status: false });
        }
    } catch (error) {
        console.error('Errore durante la gestione della richiesta utente loggato:', error);
        return res.status(500).json({ status: false, error: 'Errore durante la gestione della richiesta utente loggato' });
    }
}; */

export const getUserLogged = async (req: Request, res: Response) => {
    try {
        const token = req.headers.authorization as string;
        const bearerToken = token.split(" ")[1];
        console.log("bearerToken già splittato: " + bearerToken)
        if (!bearerToken) {
            return res.json({ status: false });
        }
        jwt.verify(bearerToken, secretKey, async (err: any, data: any) => {
            if (err) {
                return res.json({ status: false });
            } else {
                console.log(data);
                const user = await findUserById(data.id);
                if (user) return res.json({
                    status: true,
                    _id: user._id,
                    name: user.name,
                    surname: user.surname,
                    email: user.email,
                    role: user.role
                });
                else return res.json({ status: false });
            }
        });
    } catch (err: any) {
        return res.status(500).json({ error: err.message });
    }
};