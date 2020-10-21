import { Request, Response } from 'express';

import AuthService from '../services/AuthService';

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
            .json(user);
    } catch (e) {
        return res.status(e.status).json(e);
    }
  }
}