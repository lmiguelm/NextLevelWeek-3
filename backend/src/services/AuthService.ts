import bcrypt from 'bcrypt';
import { getRepository } from 'typeorm';
import User from '../models/User';
import ValidationException from '../errors/ValidationException';
import jwt from 'jsonwebtoken';
import { number } from 'yup';

export default {

  genereteToken(id: number) {
    const token = jwt.sign({ id }, process.env.JWT_SECRET_KEY as string , {
      expiresIn: 172800
    });
    return `Bearer ${token}`;
  },

  async encrypt(password: string) {
    const salt = await bcrypt.genSaltSync();
    const passEncrypted = await bcrypt.hash(password, salt);
    return passEncrypted;
  },

  async decrypt(passwordClear: string, id: number) {
    const UsersRepository = getRepository(User);
    const { password } = await UsersRepository.findOneOrFail(id);
    const isPassword = bcrypt.compareSync(passwordClear, password); 
    return isPassword;    
  },

  async login(emailReq: string, passwordReq: string) {
    const UsersRepository = getRepository(User);

    let userId: number = 0;
    let u: any = null;
    
    try {
      const user = await UsersRepository.findOneOrFail({email: emailReq});
      userId = user.id;
      u = user;
    } catch (err) {
      throw new ValidationException('E-mail inválido!', 400);
    }
    
    if(!await this.decrypt(passwordReq, userId)) {
      throw new ValidationException('Senha inválida!', 400);
    }

   return u;
  }
}