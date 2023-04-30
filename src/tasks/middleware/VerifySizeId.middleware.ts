import { NextFunction, Request, Response } from "express";


export function verifySizeId(request: Request, response: Response, next: NextFunction) {
    const { id } = request.params;

    if(id.length != 36){
        return response.status(404).json({ error: "Recado não encontrado" });
    }

    next()
}