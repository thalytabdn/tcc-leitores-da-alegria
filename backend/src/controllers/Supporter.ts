import { NextFunction, Request, Response } from 'express';
import mongoose from 'mongoose';
import Supporter from '../models/Supporter';

const createSupporter = async (req: Request, res: Response, next: NextFunction) => {
  const { name, description, image } = req.body;

  const supporter = new Supporter({
    _id: new mongoose.Types.ObjectId(),
    name,
    description,
    image
  });

  try {
    const supporter_1 = await supporter.save();
    return res.status(201).json({ supporter });
  } catch (error) {
    return res.status(500).json({ error });
  }
};

const readSupporter = async (req: Request, res: Response, next: NextFunction) => {
  const supporterId = req.params.supporterId;

  try {
    const supporter = await Supporter.findById(supporterId);
    return supporter ? res.status(200).json({ supporter }) : res.status(404).json({ message: 'Not Found' });
  } catch (error) {
    return res.status(500).json({ error });
  }
};

const readAll = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const supporters = await Supporter.find();
    return res.status(200).json({ supporters });
  } catch (error) {
    return res.status(500).json({ error });
  }
};

const updateSupporter = async (req: Request, res: Response, next: NextFunction) => {
  const supporterId = req.params.supporterId;

  return Supporter.findById(supporterId)
    .then((supporter) => {
      if (supporter) {
        supporter.set(req.body);

        return supporter
          .save()
          .then((supporter) => res.status(201).json({ supporter }))
          .catch((error) => res.status(500).json({ error }));
      } else {
        res.status(404).json({ message: 'Not found' });
      }
    })
    .catch((error) => res.status(500).json({ error }));
};

const deleteSupporter = async (req: Request, res: Response, next: NextFunction) => {
  const supporterId = req.params.supporterId;

  return Supporter.findByIdAndDelete(supporterId)
    .then((supporter) => (supporter ? res.status(201).json({ message: 'deleted' }) : res.status(404).json({ message: 'Not found' })))
    .catch((error) => res.status(500).json({ error }));
};

export default { createSupporter, readAll, readSupporter, updateSupporter, deleteSupporter };
