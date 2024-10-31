import * as jwt from 'jsonwebtoken'

require('dotenv').config();
const CRYPTO_KEY = process.env.CRYPTO_KEY || '';



export const generateToken = (payload: any): string => {
    console.log(CRYPTO_KEY);
    return jwt.sign(payload, CRYPTO_KEY);
}

export const verifyToken = (token: string): any => {

    console.log(CRYPTO_KEY);

    try {
        return jwt.verify(token, CRYPTO_KEY);
    } catch (error) {
        return null;
    }
}