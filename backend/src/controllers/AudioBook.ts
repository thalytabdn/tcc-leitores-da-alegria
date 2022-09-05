import { NextFunction, Request, Response } from 'express';
import mongoose from 'mongoose';
import AudioBook from '../models/AudioBook';

const createAudioBook = async (req: Request, res: Response, next: NextFunction) => {
  const { title, description, url } = req.body;

  const audioBook = new AudioBook({
    _id: new mongoose.Types.ObjectId(),
    title,
    description,
    url
  });

  try {
    const audioBook_1 = await audioBook.save();
    return res.status(201).json({ audioBook });
  } catch (error) {
    return res.status(500).json({ error });
  }
};

const readAudioBook = async (req: Request, res: Response, next: NextFunction) => {
  const audioBookId = req.params.audioBookId;

  try {
    const audioBook = await AudioBook.findById(audioBookId);
    return audioBook ? res.status(200).json({ audioBook }) : res.status(404).json({ message: 'Not Found' });
  } catch (error) {
    return res.status(500).json({ error });
  }
};

const readAll = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const audioBooks = await AudioBook.find();
    return res.status(200).json({ audioBooks });
  } catch (error) {
    return res.status(500).json({ error });
  }
};

const updateAudioBook = async (req: Request, res: Response, next: NextFunction) => {
  const audioBookId = req.params.audioBookId;

  return AudioBook.findById(audioBookId)
    .then((audioBook) => {
      if (audioBook) {
        audioBook.set(req.body);

        return audioBook
          .save()
          .then((audioBook) => res.status(201).json({ audioBook }))
          .catch((error) => res.status(500).json({ error }));
      } else {
        res.status(404).json({ message: 'Not found' });
      }
    })
    .catch((error) => res.status(500).json({ error }));
};

const deleteAudioBook = async (req: Request, res: Response, next: NextFunction) => {
  const audioBookId = req.params.audioBookId;

  return AudioBook.findByIdAndDelete(audioBookId)
    .then((audioBook) => (audioBook ? res.status(201).json({ message: 'deleted' }) : res.status(404).json({ message: 'Not found' })))
    .catch((error) => res.status(500).json({ error }));
};

export default { createAudioBook, readAll, readAudioBook, updateAudioBook, deleteAudioBook };
