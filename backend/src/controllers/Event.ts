import { NextFunction, Request, Response } from 'express';
import mongoose from 'mongoose';
import Event from '../models/Event';

const createEvent = async (req: Request, res: Response, next: NextFunction) => {
  const { local, date, time, readersName, bookName, bookImage, bookDescription } = req.body;

  const event = new Event({
    _id: new mongoose.Types.ObjectId(),
    local,
    date,
    time,
    readersName,
    bookName,
    bookImage,
    bookDescription
  });

  try {
    const event_1 = await event.save();
    return res.status(201).json({ event });
  } catch (error) {
    return res.status(500).json({ error });
  }
};

const readEvent = async (req: Request, res: Response, next: NextFunction) => {
  const eventId = req.params.eventId;

  try {
    const event = await Event.findById(eventId);
    return event ? res.status(200).json({ event }) : res.status(404).json({ message: 'Not Found' });
  } catch (error) {
    return res.status(500).json({ error });
  }
};

const readAll = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const events = await Event.find();
    return res.status(200).json({ events });
  } catch (error) {
    return res.status(500).json({ error });
  }
};

const updateEvent = async (req: Request, res: Response, next: NextFunction) => {
  const eventId = req.params.eventId;

  return Event.findById(eventId)
    .then((event) => {
      if (event) {
        event.set(req.body);

        return event
          .save()
          .then((event) => res.status(201).json({ event }))
          .catch((error) => res.status(500).json({ error }));
      } else {
        res.status(404).json({ message: 'Not found' });
      }
    })
    .catch((error) => res.status(500).json({ error }));
};

const deleteEvent = async (req: Request, res: Response, next: NextFunction) => {
  const eventId = req.params.eventId;

  return Event.findByIdAndDelete(eventId)
    .then((event) => (event ? res.status(201).json({ message: 'deleted' }) : res.status(404).json({ message: 'Not found' })))
    .catch((error) => res.status(500).json({ error }));
};

export default { createEvent, readAll, readEvent, updateEvent, deleteEvent };
