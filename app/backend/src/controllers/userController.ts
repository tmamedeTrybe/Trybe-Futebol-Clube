import { Request, Response } from 'express';
import User from '../database/models/User';
import IUserLogin from '../interfaces/IUserLogin';
import UserService from '../services/userService';

class UserController {
  constructor(private userService = new UserService(User)) {}

  login = async (req: Request, res: Response) => {
    const tokenLogin = await this.userService.login(req.body as IUserLogin);
    if (tokenLogin.erro) return res.status(tokenLogin.code).json({ message: tokenLogin.erro });

    return res.status(tokenLogin.code).json({ token: tokenLogin.token });
  };

  validate = async (req: Request, res: Response) => {
    const token = req.header('Authorization');
    const userRole = await this.userService.validate(token as string);
    if (userRole.erro) return res.status(userRole.code).json({ message: userRole.erro });

    return res.status(userRole.code).json({ role: userRole.role });
  };
}

export default UserController;
