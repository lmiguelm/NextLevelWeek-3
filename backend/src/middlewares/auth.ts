import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import ValidationException from '../errors/ValidationException';

interface IRequest extends Request {
  userId: number;
}

export default async function(req: IRequest, res: Response, next: NextFunction){
  try {
    const privateRoutes = [
      '/pending-orphanages'
    ];
    
    const url = req.url;

    if(!privateRoutes.some(p => p === url)) {
      return next();
    }

    const authHeader = req.headers.authorization;

    if(!authHeader) {
      throw new ValidationException('Nenhum token informado', 401);
    }

    const parts = authHeader.split(' ');

    if(parts.length !== 2) {
        throw new ValidationException('Token erro', 500);
    }

    const [scheme, token ] = parts;

    if(!/^Bearer$/i.test(scheme)) {
        throw new ValidationException('Token mal formatado', 401);
    }

    jwt.verify(token, process.env.JWT_SECRET_KEY as string, (err, decoded: any) => {
        if(err) {
            throw new ValidationException('Token inválido', 401);
        }
        req.userId = decoded.id;
        return next();
    });

  } catch (err) {
    res.status(err.status).json(err);
  }
}