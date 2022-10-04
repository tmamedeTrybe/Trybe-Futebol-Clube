import User from '../database/models/User';
import { verifyToken } from '../helpers/jwt';

const validateToken = async (token:string) => {
  const infoToken = verifyToken(token);

  if (infoToken === null) return { code: 401, erro: 'Token must be a valid token' };

  const uservalid = await User.findByPk(infoToken.id);

  if (uservalid === null) return { code: 401, erro: 'Token must be a valid token' };
  return { code: 200 };
};

export default validateToken;
