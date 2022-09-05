import { Request, Response, NextFunction } from 'express';
import Logging from '../library/Logging';
import jwt from 'jsonwebtoken';
import { config } from '../config/config';

export const extractJWT = (req: Request, res: Response, next: NextFunction) => {
  Logging.info('Validating Token');

  let token = req.headers.authorization?.split(' ')[1];

  if (token) {
    jwt.verify(token, config.server.token.secret, (error, decoded) => {
      if (error) {
        return res.status(404).json({
          message: error.message,
          error
        });
      } else {
        res.locals.jwt = decoded;
        req.body.role = decoded;
        next();
      }
    });
  } else {
    return res.status(401).json({
      message: 'Unauthorized'
    });
  }
};

export const verifyPermission = (permission: number) => {
  return async function (req: Request, res: Response, next: NextFunction) {
    Logging.info('Validating Permission');

    const { role } = req.body.role;

    if (role < permission) {
      return res.status(401).json({
        message: 'Unauthorized'
      });
    } else {
      next();
    }
  };
};

module.exports = { extractJWT, verifyPermission };
