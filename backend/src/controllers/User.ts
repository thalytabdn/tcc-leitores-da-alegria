import { NextFunction, Request, Response } from 'express';
import mongoose from 'mongoose';
import Logging from '../library/Logging';
import User from '../models/User';
import bcrypt from 'bcryptjs';
import signJWT from '../middleware/signJWT';
import IUser from '../models/interfaces/user';
import jwt from 'jsonwebtoken';
import { config } from '../config/config';
import { string } from 'joi';

const NAMESPACE = 'User';

const validateToken = (req: Request, res: Response, next: NextFunction) => {
  Logging.info('Token validated, user authorized');

  return res.status(200).json({ message: 'Authorized' });
};

const getByToken = async (req: Request, res: Response, next: NextFunction) => {
  let token = req.headers.authorization?.split(' ')[1];

  if (token) {
    jwt.verify(token, config.server.token.secret, (error, decoded) => {
      if (error) {
        return res.status(404).json({
          message: error.message,
          error
        });
      } else {
        const id = (<any>decoded)?.id;
        if (!id) {
          return res.status(400).json({ message: 'Invalid token' });
        }

        return User.findById(id)
          .then((user) => {
            if (user) {
              return res.status(201).json({ user });
            } else {
              res.status(404).json({ message: 'Not found' });
            }
          })
          .catch((error) => res.status(500).json({ error }));
      }
    });
  } else {
    return res.status(401).json({
      message: 'Unauthorized'
    });
  }
};

const register = async (req: Request, res: Response, next: NextFunction) => {
  const { name, email, password, role } = req.body;

  bcrypt.hash(password, 10, (hashError, hash) => {
    if (hashError) {
      return res.status(401).json({
        message: hashError.message,
        error: hashError
      });
    }

    const _user: IUser = new User({
      _id: new mongoose.Types.ObjectId(),
      name,
      email,
      password: hash,
      role,
      tokenHash: null,
      tokenExpiration: null
    });

    return _user
      .save()
      .then((user: IUser) => {
        return res.status(201).json({
          user
        });
      })
      .catch((error: IUser) => {
        return res.status(500).json({
          message: error,
          error
        });
      });
  });
};

const loginUser = async (req: Request, res: Response, next: NextFunction) => {
  const { email, password } = req.body;

  await User.findOne({ email: email })
    .exec()
    .then(async (user) => {
      if (!user) {
        return res.status(401).json({
          message: 'Invalid Credentials email'
        });
      }

      bcrypt.compare(password, user.password, (error, result) => {
        if (!result) {
          Logging.error('Invalid credentials');
          return res.status(401).json({
            message: 'Invalid Credentials password'
          });
        } else if (result) {
          signJWT(user, (_error, token) => {
            if (_error) {
              Logging.error('Unable to sign token');

              return res.status(401).json({
                message: 'Unauthorized',
                error: _error
              });
            } else if (token) {
              return res.status(200).json({
                message: 'Auth successful',
                token: token,
                user: user
              });
            }
          });
        }
      });
    })
    .catch((err) => {
      Logging.error(err);
      res.status(500).json({
        error: err
      });
    });
};

const readUser = async (req: Request, res: Response, next: NextFunction) => {
  const userId = req.params.userId;

  try {
    const user = await User.findById(userId);
    return user ? res.status(200).json({ user }) : res.status(404).json({ message: 'Not Found' });
  } catch (error) {
    return res.status(500).json({ error });
  }
};

const readAll = async (req: Request, res: Response, next: NextFunction) => {
  User.find()
    .select('-password')
    .exec()
    .then((users) => {
      return res.status(200).json({
        users: users,
        count: users.length
      });
    })
    .catch((error) => {
      return res.status(500).json({
        message: error.message,
        error
      });
    });
};

const updateUser = async (req: Request, res: Response, next: NextFunction) => {
  const userId = req.params.userId;
  console.log(userId);

  return User.findById(userId)
    .then(async (user) => {
      if (user) {
        let body = {};
        let { name, email, password, role } = req.body;

        if (password) {
          await bcrypt.hash(password, 10, (hashError, hash) => {
            body = { ...body, password: hash };
            if (email) {
              body = { ...body, email: email };
            }
            if (name) {
              body = { ...body, name: name };
            }
            if (role) {
              body = { ...body, role: role };
            }

            user.set(body);

            return user
              .save()
              .then((user) => res.status(201).json({ user }))
              .catch((error) => res.status(500).json({ error }));
          });
        } else {
          if (email) {
            body = { ...body, email: email };
          }
          if (name) {
            body = { ...body, name: name };
          }
          if (role) {
            body = { ...body, role: role };
          }

          user.set(body);

          return user
            .save()
            .then((user) => res.status(201).json({ user }))
            .catch((error) => res.status(500).json({ error }));
        }
      } else {
        res.status(404).json({ message: 'Not found' });
      }
    })
    .catch((error) => res.status(500).json({ error }));
};

const deleteUser = async (req: Request, res: Response, next: NextFunction) => {
  const userId = req.params.userId;

  return User.findByIdAndDelete(userId)
    .then((user) => (user ? res.status(201).json({ message: 'deleted' }) : res.status(404).json({ message: 'Not found' })))
    .catch((error) => res.status(500).json({ error }));
};

const resetPassword = async (req: Request, res: Response, next: NextFunction) => {
  const { oldPassword, newPassword } = req.body;
  const { id } = req.params;

  await User.findById(id)
    .exec()
    .then(async (user) => {
      if (!user) {
        return res.status(401).json({
          message: 'User not found'
        });
      }

      bcrypt.compare(oldPassword, user.password, async (error, result) => {
        if (!result) {
          return res.status(401).json({
            message: 'Invalid Password'
          });
        } else {
          bcrypt.hash(newPassword, 10, (hashError, hash) => {
            if (hashError) {
              return res.status(401).json({
                message: hashError.message,
                error: hashError
              });
            }
            user.set({ password: hash });
            return user
              .save()
              .then((user) => res.status(201).json({ user }))
              .catch((error) => res.status(500).json({ error }));
          });
        }
      });
    })
    .catch((err) => {
      Logging.error(err);
      res.status(500).json({
        error: err
      });
    });
};

const forgetPassword = async (req: Request, res: Response, next: NextFunction) => {
  const { email } = req.body;

  console.log(email);

  await User.findOne({ email: email })
    .exec()
    .then(async (user) => {
      if (!user) {
        return res.status(401).json({
          message: 'Invalid Credentials email'
        });
      }

      const hash = new Date().getTime();

      user.set({ tokenHash: hash });
      return user
        .save()
        .then((user) => res.status(201).json({ user }))
        .catch((error) => res.status(500).json({ error }));
    });
};

export default { register, getByToken, readAll, readUser, updateUser, loginUser, deleteUser, validateToken, forgetPassword, resetPassword };
