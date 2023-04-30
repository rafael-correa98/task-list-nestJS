import { NextFunction, Request, Response } from "express";


export function verifySizeUserId(request: Request, response: Response, next: NextFunction) {
    const { userId } = request.params;

    if(userId.length != 36){
        return response.status(404).json({ error: "Usuário não encontrado" });
    }

    next()
}