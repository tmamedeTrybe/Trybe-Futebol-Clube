import { compareSync } from 'bcryptjs';
import IUserLogin from '../interfaces/IUserLogin';
import User from '../database/models/User';
import { tokenGenerate, verifyToken } from '../helpers/jwt';
import validateLogin from '../validations/validateLogin';
import IUser from '../interfaces/IUser';

class UserService {
  constructor(private UserModel: typeof User) {}

  public async login({ email, password }:IUserLogin) {
    const validLogin = validateLogin({ email, password });
    if (validLogin.erro) return { code: validLogin.code, erro: validLogin.erro };

    const userValid = await this.UserModel.findOne({ where: { email } });
    if (!userValid) return { code: 401, erro: 'Incorrect email or password' };

    const checkPassword = compareSync(password, userValid.password);

    if (!checkPassword) return { code: 401, erro: 'Incorrect email or password' };

    const token = tokenGenerate(userValid);

    return { code: 200, token };
  }

  public async validate(token:string) {
    const userToken = verifyToken(token);
    if (userToken === null) return { code: 401, erro: 'Invalid token' };
    const { id } = userToken;
    const user:IUser | null = await this.UserModel.findByPk(id);

    if (!user) return { code: 401, erro: 'Invalid token' };

    return { code: 200, role: user.role };
  }
}

export default UserService;
