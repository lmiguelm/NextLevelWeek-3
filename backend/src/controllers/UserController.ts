import { Request, Response } from 'express';
import { getRepository } from 'typeorm';

import User from '../models/User';
import AuthService from '../services/AuthService';
import * as Yup from 'yup';

export default {
  async index(req: Request, res: Response) {
    const usersRepository = getRepository(User);
    const users = await usersRepository.find();
    return res.json(users);
  },

  async create(req: Request, res: Response) {
    const { name, email, password } = req.body;
    const passwordEncrypted = await AuthService.encrypt(password);

    const data = {
      name,
      email,
      password: passwordEncrypted
    };

    const schema = Yup.object().shape({
      name: Yup.string().required('Nome obrigatório'),
      email: Yup.string().required('E-mail obrigatório'),
      password: Yup.string().required('Senha obrigatório'),
    });

    const finalData = schema.cast(schema);

    await schema.validate(data, {
      abortEarly: false
    });

    const usersRepository = getRepository(User);
    const user = await usersRepository.create(data);
    usersRepository.save(user);

    res.status(201).json(user);
  }
}