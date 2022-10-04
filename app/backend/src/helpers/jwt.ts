import { JwtPayload, sign, verify } from 'jsonwebtoken';
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

const verifyToken = (token:string): JwtPayload | null => {
  try {
    const decoded = verify(token, process.env.JWT_SECRET as string) as JwtPayload;

    return decoded;
  } catch (error) {
    return null;
}
};

export {
  tokenGenerate,
  verifyToken,
};
