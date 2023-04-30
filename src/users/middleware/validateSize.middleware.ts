import { Request, Response, NextFunction } from 'express';

export function validateSize (request: Request, response: Response, next: NextFunction){
    const { name } = request.body;

    if(name.length < 3) return response.status(400).json({error: "O tamanho do nome não pode ser inferior a três caracteres"})
    
    next()
}