import { Request, Response } from 'express';
import { registerUser, matchUser, findUserById } from '../services/user.service';
import { IUser } from '../types/user.type';
import { createSecretToken } from '../utils/user.utils';
const jwt = require("jsonwebtoken");

import dotenv from 'dotenv'
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

        const token = createSecretToken(email.id, 1);
        console.log(res.cookie("token", token, {
            httpOnly: false,
            //TODO aggiungi altri sistemi di sicurezza
            //TODO aggiungi refresh token 
        }));
        res
            .status(201)
            .json({ message: "User logged", success: true });
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
/*     export const getUserLogged = async (req: Request, res: Response) => {
        const token = req.cookies.token;
        try{
            
        }
        if (!token) {
            return res.json({ status: false });
        }
        jwt.verify(token, secretKey, async (err: any, data: any) => {
            if (err) {
                return res.json({ status: false });
            } else {
                const user = await findUserById(data.id);
                if (user) return res.json({ status: true, user: user.surname });
                else return res.json({ status: false });
            }
        });
    }; */

