import jwt from 'jsonwebtoken';
import { verifyToken } from '../utils/cryptoUtils';

export async function verifyJWT(req: any, res: any, next: any) {
    
    const authHeader = req.headers["authorization"];
    const token = authHeader && authHeader.split(" ")[1];

    if (token == null) return res.sendStatus(401);

    if(verifyToken(token)){
        return next();
    } else {
        return res.sendStatus(401);
    }

}