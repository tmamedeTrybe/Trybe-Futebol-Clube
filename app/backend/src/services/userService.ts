import IUserLogin from '../interfaces/IUserLogin';
import User from '../database/models/User';
import { compareSync } from 'bcryptjs';
import tokenGenerate from '../helpers/jwt';
import validateLogin from '../validations/validateLogin';

class UserService {
  constructor (private UserModel: typeof User) {}

  public async login({email, password}:IUserLogin)  {
    const userValid = await this.UserModel.findOne({ where: { email } });
    if(!userValid) return { code: 401, erro: 'Incorrect email or password'};

    const checkPassword = compareSync(password, userValid.password);
    if (!checkPassword) return {code: 401, erro: 'Incorrect email or password'};

    const validLogin = validateLogin({email, password});
    if (validLogin.erro) return { code: validLogin.code, erro: validLogin.erro }

    const token = tokenGenerate(userValid);

    return {code: 200, token};
  }
}

export default UserService;