import { NextFunction, Request, Response } from 'express';
import mongoose from 'mongoose';
import Image from '../models/Image';

const createImage = async (req: Request, res: Response, next: NextFunction) => {
  const { url, description } = req.body;

  const image = new Image({
    _id: new mongoose.Types.ObjectId(),
    url,
    description
  });

  try {
    const image_1 = await image.save();
    return res.status(201).json({ image });
  } catch (error) {
    return res.status(500).json({ error });
  }
};

const readImage = async (req: Request, res: Response, next: NextFunction) => {
  const imageId = req.params.imageId;

  try {
    const image = await Image.findById(imageId);
    return image ? res.status(200).json({ image }) : res.status(404).json({ message: 'Not Found' });
  } catch (error) {
    return res.status(500).json({ error });
  }
};

const readAll = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const images = await Image.find();
    return res.status(200).json({ images });
  } catch (error) {
    return res.status(500).json({ error });
  }
};

const updateImage = async (req: Request, res: Response, next: NextFunction) => {
  const imageId = req.params.imageId;

  return Image.findById(imageId)
    .then((image) => {
      if (image) {
        image.set(req.body);

        return image
          .save()
          .then((image) => res.status(201).json({ image }))
          .catch((error) => res.status(500).json({ error }));
      } else {
        res.status(404).json({ message: 'Not found' });
      }
    })
    .catch((error) => res.status(500).json({ error }));
};

const deleteImage = async (req: Request, res: Response, next: NextFunction) => {
  const imageId = req.params.imageId;

  return Image.findByIdAndDelete(imageId)
    .then((image) => (image ? res.status(201).json({ message: 'deleted' }) : res.status(404).json({ message: 'Not found' })))
    .catch((error) => res.status(500).json({ error }));
};

export default { createImage, readAll, readImage, updateImage, deleteImage };
