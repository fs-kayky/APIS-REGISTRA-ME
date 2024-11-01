import { Request, Response } from 'express';
import User from '../models/User';
import { Counter } from '../utils/idUtils';
import { hashPassword, verifyPassword } from '../utils/hashUtils';
import { generateToken, verifyToken } from '../utils/cryptoUtils';

export const register = async (req: Request, res: Response): Promise<any> => {
    const { nickname, email, password } = req.body;

    try {
        const existingUser = await User.findOne({ $or: [{ email }, { nickname }] });

        if (existingUser) {
            return res.status(400).json({ message: "Usuário já existe" });
        }

        const counter = await Counter.findOneAndUpdate(
            {},
            { $inc: { sequenceValue: 1 } },
            { new: true, upsert: true }

        );

        const userId = counter?.sequenceValue;

        console.log('Chegou aqui');

        const hashUserPassword = await hashPassword(password);

        const newUser = new User({ nickname, email, password: hashUserPassword, UserId: userId });
        console.log(newUser)
        await newUser.save();
        res.status(201).json({ message: "Usuário criado com sucesso" });

    } catch (error) {
        res.status(500).json({ message: "Erro ao criar usuário", error });
    }
}

export const login = async (req: Request, res: Response): Promise<any> => {

    const { email, password } = req.body;

    try {
        const user = await User.findOne({ email })

        if (user) {
            const passwordValidated: boolean = await verifyPassword(user.password, password);
            if (!passwordValidated) {
                return res.status(404).json({ message: "Credenciais Inválidas" });
            }

            const { password: _, ...userData } = user.toObject();
            res.status(200).json(
                {
                    message: "Usuário logado com sucesso",
                    user: generateToken(userData)
                }
            )

        } else {
            res.status(404).json({ message: "Usuário não encontrado" });
        }
    } catch (error) {
        res.status(500).json({ message: "Erro ao logar usuário", error });
    }

}

export const DecryptUserInformation = async (req: Request, res: Response): Promise<any> => {

    const { token } = req.body;

    try {
        if (!token) {
            return res.status(400).json({ message: "Token não informado" });
        }

        if (verifyToken(token)) {
            return res.status(200).json({ message: "Token válido", user: verifyToken(token) });
        } else {
            return res.status(400).json({ message: "Token inválido ou expirado..." });
        }
    } catch (error) {
        res.status(500).json({ message: "Erro ao validar token", error });
    }
}