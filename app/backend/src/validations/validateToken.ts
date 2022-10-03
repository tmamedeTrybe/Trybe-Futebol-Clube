import User from '../database/models/User';
import { verifyToken } from '../helpers/jwt';

const validateToken = async (token:string) => {
  const infoToken = verifyToken(token);
  const uservalid = await User.findByPk(infoToken.data.id);
  if (!uservalid) return { code: 400, erro: 'Invalid token' };
  return { code: 200 };
};

export default validateToken;
