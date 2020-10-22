import { Request, Response } from 'express';
import jwt from 'jsonwebtoken';

import AuthService from '../services/AuthService';
import ValidateException from '../errors/ValidationException';
import UserView from '../views/UserView';

export default {
  async login(req: Request, res: Response) {
    try {
        const { email, password } = req.body;
        const user = await AuthService.login(email, password);
        const token = await AuthService.genereteToken(user.id);
        return res
            .status(200)
            .set({ 'Authorization': token })
            .set({'access-control-expose-headers': 'Authorization'})
            .json(UserView.render(user));
    } catch (e) {
        return res.status(e.status).json(e);
    }
  },

  async authenticateToken(req: Request, res: Response) {
    try {
      const { token } = req.body;

      const parts = token.split(' ');
      const [scheme, tokenJWT ] = parts;
      
      jwt.verify(tokenJWT, process.env.JWT_SECRET_KEY as string , (err: any) => {
          if(err) {
              throw new ValidateException('Token inválido', 401);
          }
      });
      return res.status(200).send();
  } catch (e) {
      return res.status(e.status).json(e);
  }
  }
}