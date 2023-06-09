import { Request, Response, NextFunction } from 'express';

export function validateDescriptDetailParamsTask (request: Request, response: Response, next: NextFunction){
    const { description, detail } = request.body

    if(!description) return response.status(400).json({error: "O campo descrição é obrigatório"});
    if(!detail) return response.status(400).json({error: "O campo detalhamento é obrigatório"});
    
    next() 
}