import express from 'express';
import controller from '../controllers/Info';
import { Schemas, ValidateSchema } from './../middleware/ValidateSchema';

const router = express.Router();

router.post('/infos', ValidateSchema(Schemas.info.create), controller.createInfo);
router.get('/infos/:infoId', controller.readInfo);
router.get('/infos', controller.readAll);
router.patch('/infos/:infoId', ValidateSchema(Schemas.info.update), controller.updateInfo);
router.delete('/infos/:infoId', controller.deleteInfo);

export = router;
