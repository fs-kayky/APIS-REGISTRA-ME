import { Request, Response } from 'express';
import User from '../models/User';
import { Counter } from './IdCounter';

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

        const newUser = new User({ nickname, email, password, UserId: userId });
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
        if (!user || user.password !== password) {
            return res.status(404).json({ message: "Credenciais Inválidas" });
        }

        const { password: _, ...userData } = user.toObject();

        res.status(200).json(
            {
                message: "Usuário logado com sucesso",
                user: userData
            }
        )

    } catch (error) {
        res.status(500).json({ message: "Erro ao logar usuário", error });
    }

}
