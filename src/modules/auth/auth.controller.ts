import { Request, Response } from "express"
import { AuthService } from "./auth.services";

const loginWithEmailAndPass = async (req: Request, res: Response) => {
    try {
        const result = await AuthService.loginWithEmailAndPass(req.body)
        res.status(201).json(result)
    } catch (error) {
        res.status(500).send(error);
    }
}

export const AuthController = {
    loginWithEmailAndPass
}