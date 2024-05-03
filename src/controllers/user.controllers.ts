import { Request, Response } from 'express';
import { registerUser, matchUser, findUserById, updateLoginStatus, adminRegister } from '../services/user.service';
import { IUser } from '../types/user.type';
import { createSecretToken } from '../utils/user.utils';
import { ExtendedRequest } from '../middlewares/user.auth';
const jwt = require("jsonwebtoken");

import dotenv from 'dotenv'
//import { Logger } from 'concurrently';
//import { idTokenMiddleware } from '../middlewares/user.auth';
dotenv.config()
const secretKey = process.env.JWT_SECRET;

export const signup = async (req: Request, res: Response) => {
    try {
        const newUser: IUser = req.body;
        const userCreated: IUser = await registerUser(newUser);
        return res.status(200).json({ userCreated });
    } catch (err: any) {
        return res.status(400).json({ error: err.message });
    }
};

// TODO admin register

export const adminSignup = async(req: Request, res: Response) => {
    try {
        const newADMIN: IUser = req.body;
        const ADMINCreated: IUser = await adminRegister(newADMIN);
        return res.status(200).json({ ADMINCreated });           
    } catch (err: any) {
        return res.status(400).json({ error: err.message });
    }
};


export const login = async (req: Request, res: Response) => {
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
            updateLoginStatus(userId, true);
            res.cookie("token", token, {
                httpOnly: true,
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

export const logout = async (req: ExtendedRequest, res: Response) => {
    try {
        const userId = req.user?._id;
        if (userId) {
            const logStatus = await findUserById(userId)
            if (logStatus?.loggedIn === false) {
                return res.status(400).json({ message: 'User already logged out' });
            }
            // TODO forse dovrei anche invalidare il token?
            await updateLoginStatus(userId, false);
            res.clearCookie("token"); //! i cookie sono specifici dell'utente?
            res
                .status(200)
                .json({ message: "User logged out successfully", success: true });
        }
    } catch (err: any) {
        return res.status(500).json({ error: err.message });
    }
};


export const getUserLogged = async (req: ExtendedRequest, res: Response) => {
    try {
        const userId = req.user?._id;
        console.log("id utente: " + userId)
        if (userId) {
            const user = await findUserById(userId);
            if (user) return res.json({
                status: true,
                _id: user._id,
                name: user.name,
                surname: user.surname,
                email: user.email,
                role: user.role,
                oggedIn: user.loggedIn
            });
            else return res.json({ status: false });
        }
    } catch (err: any) {
        return res.status(500).json({ error: err.message });
    }
};