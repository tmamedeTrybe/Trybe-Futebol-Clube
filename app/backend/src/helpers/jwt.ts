import { sign } from 'jsonwebtoken';
import IUser from '../interfaces/IUser';

const tokenGenerate = (user: IUser) => {
  const payload = {
    id: user.id,
    displayName: user.username,
    email: user.email,
  };

  const token = sign(payload, process.env.JWT_SECRET as string, {
    expiresIn: '1d',
    });

  return token;
};

export default tokenGenerate;