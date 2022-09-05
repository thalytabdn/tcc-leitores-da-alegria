import express from 'express';
import controller from '../controllers/Form';
import { Schemas, ValidateSchema } from './../middleware/ValidateSchema';

const router = express.Router();

router.post('/forms', ValidateSchema(Schemas.form.create), controller.createForm);
router.get('/forms/:formId', controller.readForm);
router.get('/forms', controller.readAll);
router.patch('/forms/:formId', ValidateSchema(Schemas.form.update), controller.updateForm);
router.delete('/forms/:formId', controller.deleteForm);

export = router;
