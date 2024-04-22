import jwt from 'jsonwebtoken';
import dotenv from 'dotenv'
dotenv.config()
const secretKey = process.env.JWT_SECRET;

export const createSecretToken = (id: string, days: number) => {
    return jwt.sign({id}, secretKey!, {
        expiresIn: days*24*60*60
    });
};