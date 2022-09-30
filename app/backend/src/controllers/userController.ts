import { Request, Response } from 'express';
import User from '../database/models/User';
import IUserLogin from '../interfaces/IUserLogin';
import UserService from '../services/userService';

class UserController {
  constructor(private userService = new UserService(User)) {}

  login = async (req: Request, res: Response) => {
    const tokenLogin = await this.userService.login(req.body as IUserLogin);
    if(tokenLogin.erro) return res.status(tokenLogin.code).json({ message: tokenLogin.erro });

    return res.status(tokenLogin.code).json({ token: tokenLogin.token })
  }
}

export default UserController;