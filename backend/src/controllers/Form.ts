import { NextFunction, Request, Response } from 'express';
import mongoose from 'mongoose';
import Form from '../models/Form';

const createForm = async (req: Request, res: Response, next: NextFunction) => {
  const { contract, subscription } = req.body;

  const form = new Form({
    _id: new mongoose.Types.ObjectId(),
    contract,
    subscription
  });

  try {
    const form_1 = await form.save();
    return res.status(201).json({ form });
  } catch (error) {
    return res.status(500).json({ error });
  }
};

const readForm = async (req: Request, res: Response, next: NextFunction) => {
  const formId = req.params.formId;

  try {
    const form = await Form.findById(formId);
    return form ? res.status(200).json({ form }) : res.status(404).json({ message: 'Not Found' });
  } catch (error) {
    return res.status(500).json({ error });
  }
};

const readAll = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const forms = await Form.find();
    return res.status(200).json({ forms });
  } catch (error) {
    return res.status(500).json({ error });
  }
};

const updateForm = async (req: Request, res: Response, next: NextFunction) => {
  const formId = req.params.formId;

  return Form.findById(formId)
    .then((form) => {
      if (form) {
        form.set(req.body);

        return form
          .save()
          .then((form) => res.status(201).json({ form }))
          .catch((error) => res.status(500).json({ error }));
      } else {
        res.status(404).json({ message: 'Not found' });
      }
    })
    .catch((error) => res.status(500).json({ error }));
};

const deleteForm = async (req: Request, res: Response, next: NextFunction) => {
  const formId = req.params.formId;

  return Form.findByIdAndDelete(formId)
    .then((form) => (form ? res.status(201).json({ message: 'deleted' }) : res.status(404).json({ message: 'Not found' })))
    .catch((error) => res.status(500).json({ error }));
};

export default { createForm, readAll, readForm, updateForm, deleteForm };
