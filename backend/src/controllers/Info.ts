import { NextFunction, Request, Response } from 'express';
import mongoose from 'mongoose';
import Info from '../models/Info';

const createInfo = async (req: Request, res: Response, next: NextFunction) => {
  const { title, text } = req.body;

  const info = new Info({
    _id: new mongoose.Types.ObjectId(),
    title,
    text
  });

  try {
    const info_1 = await info.save();
    return res.status(201).json({ info });
  } catch (error) {
    return res.status(500).json({ error });
  }
};

const readInfo = async (req: Request, res: Response, next: NextFunction) => {
  const infoId = req.params.infoId;

  try {
    const info = await Info.findById(infoId);
    return info ? res.status(200).json({ info }) : res.status(404).json({ message: 'Not Found' });
  } catch (error) {
    return res.status(500).json({ error });
  }
};

const readAll = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const infos = await Info.find();
    return res.status(200).json({ infos });
  } catch (error) {
    return res.status(500).json({ error });
  }
};

const updateInfo = async (req: Request, res: Response, next: NextFunction) => {
  const infoId = req.params.infoId;

  return Info.findById(infoId)
    .then((info) => {
      if (info) {
        info.set(req.body);

        return info
          .save()
          .then((info) => res.status(201).json({ info }))
          .catch((error) => res.status(500).json({ error }));
      } else {
        res.status(404).json({ message: 'Not found' });
      }
    })
    .catch((error) => res.status(500).json({ error }));
};

const deleteInfo = async (req: Request, res: Response, next: NextFunction) => {
  const infoId = req.params.infoId;

  return Info.findByIdAndDelete(infoId)
    .then((info) => (info ? res.status(201).json({ message: 'deleted' }) : res.status(404).json({ message: 'Not found' })))
    .catch((error) => res.status(500).json({ error }));
};

export default { createInfo, readAll, readInfo, updateInfo, deleteInfo };
