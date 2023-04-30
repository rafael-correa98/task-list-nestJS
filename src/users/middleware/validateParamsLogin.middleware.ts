import { Request, Response, NextFunction } from 'express';

export function validateParamsLogin (request: Request, response: Response, next: NextFunction){
    const { name, password } = request.body;

    if(!name) return response.status(400).json({error: "O campo name é obrigatório"});
    if(!password) return response.status(400).json({error: "O campo password é obrigatório"});
    
    next() 
}