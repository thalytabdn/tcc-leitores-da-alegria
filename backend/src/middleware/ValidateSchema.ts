import joi, { ObjectSchema } from 'joi';
import { NextFunction, Response, Request } from 'express';
import Logging from '../library/Logging';
import Joi from 'joi';
import { AudioBookDTO } from '../models/AudioBook';
import { MemberDTO } from '../models/Member';
import { EventDTO } from '../models/Event';
import { SupporterDTO } from '../models/Supporter';
import IUser from '../models/interfaces/user';
import { FormDTO } from '../models/Form';
import { InfoDTO } from '../models/Info';
import { ImageDTO } from '../models/Image';

const JoiDate = require('joi').extend(require('@joi/date'));

export const ValidateSchema = (schema: ObjectSchema) => {
  return async (req: Request, res: Response, next: NextFunction) => {
    try {
      await schema.validateAsync(req.body);
      next();
    } catch (error) {
      Logging.error(error);
      return res.status(422).json({ error });
    }
  };
};

export const Schemas = {
  audioBook: {
    create: Joi.object<AudioBookDTO>({
      title: Joi.string().required(),
      url: Joi.string().required(),
      description: Joi.string().required()
    }),
    update: Joi.object<AudioBookDTO>({
      title: Joi.string(),
      url: Joi.string(),
      description: Joi.string()
    })
  },
  member: {
    create: Joi.object<MemberDTO>({
      name: Joi.string().required(),
      image: Joi.string().required(),
      description: Joi.string().required()
    }),
    update: Joi.object<MemberDTO>({
      name: Joi.string(),
      image: Joi.string(),
      description: Joi.string()
    })
  },
  form: {
    create: Joi.object<FormDTO>({
      contract: Joi.string().required(),
      subscription: Joi.string().required()
    }),
    update: Joi.object<FormDTO>({
      contract: Joi.string(),
      subscription: Joi.string()
    })
  },
  event: {
    create: Joi.object<EventDTO>({
      local: Joi.string().required(),
      date: JoiDate.date().format('YYYY-MM-DDTHH:mm:ss.000Z').required(),
      time: Joi.string().required(),
      readersName: Joi.string().required(),
      bookName: Joi.string().required(),
      bookImage: Joi.string().required(),
      bookDescription: Joi.string().required()
    }),
    update: Joi.object<EventDTO>({
      local: Joi.string(),
      date: JoiDate.date().format('YYYY/MM/DDTHH:mm:ss.000Z'),
      time: Joi.string(),
      readersName: Joi.string(),
      bookName: Joi.string(),
      bookImage: Joi.string(),
      bookDescription: Joi.string()
    })
  },
  supporter: {
    create: Joi.object<SupporterDTO>({
      name: Joi.string().required(),
      image: Joi.string().required(),
      description: Joi.string().required()
    }),
    update: Joi.object<SupporterDTO>({
      name: Joi.string(),
      image: Joi.string(),
      description: Joi.string()
    })
  },
  user: {
    create: Joi.object<IUser>({
      name: Joi.string().required(),
      email: Joi.string().email().required(),
      password: Joi.string().required(),
      role: Joi.number()
    }),
    login: Joi.object<IUser>({
      email: Joi.string().email().required(),
      password: Joi.string().required()
    }),
    forgetPassword: Joi.object<IUser>({
      email: Joi.string().email().required()
    }),
    resetPassword: Joi.object<IUser>({
      password: Joi.string().required()
    }),
    update: Joi.object<IUser>({
      name: Joi.string(),
      email: Joi.string().email(),
      password: Joi.string()
    })
  },
  info: {
    create: Joi.object<InfoDTO>({
      title: Joi.string().required(),
      text: Joi.string().required()
    }),
    update: Joi.object<InfoDTO>({
      title: Joi.string(),
      text: Joi.string()
    })
  },
  image: {
    create: Joi.object<ImageDTO>({
      url: Joi.string().required(),
      description: Joi.string().required()
    }),
    update: Joi.object<ImageDTO>({
      url: Joi.string(),
      description: Joi.string()
    })
  }
};
