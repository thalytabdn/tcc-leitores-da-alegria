import { NextFunction, Request, Response } from 'express';
import mongoose from 'mongoose';
import Member from '../models/Member';

const createMember = async (req: Request, res: Response, next: NextFunction) => {
  const { name, description, image } = req.body;

  const member = new Member({
    _id: new mongoose.Types.ObjectId(),
    name,
    description,
    image
  });

  try {
    const member_1 = await member.save();
    return res.status(201).json({ member });
  } catch (error) {
    return res.status(500).json({ error });
  }
};

const readMember = async (req: Request, res: Response, next: NextFunction) => {
  const memberId = req.params.memberId;

  try {
    const member = await Member.findById(memberId);
    return member ? res.status(200).json({ member }) : res.status(404).json({ message: 'Not Found' });
  } catch (error) {
    return res.status(500).json({ error });
  }
};

const readAll = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const members = await Member.find();
    return res.status(200).json({ members });
  } catch (error) {
    return res.status(500).json({ error });
  }
};

const updateMember = async (req: Request, res: Response, next: NextFunction) => {
  const memberId = req.params.memberId;

  return Member.findById(memberId)
    .then((member) => {
      if (member) {
        member.set(req.body);

        return member
          .save()
          .then((member) => res.status(201).json({ member }))
          .catch((error) => res.status(500).json({ error }));
      } else {
        res.status(404).json({ message: 'Not found' });
      }
    })
    .catch((error) => res.status(500).json({ error }));
};

const deleteMember = async (req: Request, res: Response, next: NextFunction) => {
  const memberId = req.params.memberId;

  return Member.findByIdAndDelete(memberId)
    .then((member) => (member ? res.status(201).json({ message: 'deleted' }) : res.status(404).json({ message: 'Not found' })))
    .catch((error) => res.status(500).json({ error }));
};

export default { createMember, readAll, readMember, updateMember, deleteMember };
