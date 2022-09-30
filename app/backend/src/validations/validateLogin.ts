import IUserLogin from '../interfaces/IUserLogin';

const validateLogin = ({ email, password }:IUserLogin) => {
  if (!email || !password) return { code: 400, erro: 'All fields must be filled' };

  const emailRegex = /^\w+([-+.']\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*$/;
  const checkEmail = emailRegex.test(email);
  if (!checkEmail) return { code: 401, erro: 'Incorrect email or password' };

  return { code: 200 };
};

export default validateLogin;
