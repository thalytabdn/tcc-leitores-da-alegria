import Logging from '../library/Logging';
import jwt from 'jsonwebtoken';
import { config } from '../config/config';
import IUser from '../models/interfaces/user';

const signJWT = (user: IUser, callback: (error: Error | null, token: string | null) => void) => {
  const expirationTimeInSeconds = Number(config.server.token.expireTime);

  Logging.info(`Attempting to sign token for ${user.name}`);

  try {
    jwt.sign(
      {
        username: user.name,
        role: user.role,
        id: user.id
      },
      config.server.token.secret,
      {
        issuer: config.server.token.issuer,
        algorithm: 'HS256',
        expiresIn: expirationTimeInSeconds
      },
      (error, token) => {
        if (error) {
          callback(error, null);
        } else if (token) {
          callback(null, token);
        }
      }
    );
  } catch (error: any) {
    Logging.error(error);
    callback(error, null);
  }
};

export default signJWT;
