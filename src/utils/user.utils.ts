import jwt from 'jsonwebtoken';
import dotenv from 'dotenv'
dotenv.config()
const secretKey = process.env.JWT_SECRET;

export const createSecretToken = (user: object, days: number) => {
    return jwt.sign(user, secretKey!, {
        expiresIn: days * 24 * 60 * 60
    });
};