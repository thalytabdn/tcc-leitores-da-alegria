import express from 'express';
import controller from '../controllers/Image';
import { Schemas, ValidateSchema } from './../middleware/ValidateSchema';

const router = express.Router();

router.post('/images', ValidateSchema(Schemas.image.create), controller.createImage);
router.get('/images/:imageId', controller.readImage);
router.get('/images', controller.readAll);
router.patch('/images/:imageId', ValidateSchema(Schemas.image.update), controller.updateImage);
router.delete('/images/:imageId', controller.deleteImage);

export = router;
