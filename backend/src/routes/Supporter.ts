import express from 'express';
import controller from '../controllers/Supporter';
import { Schemas, ValidateSchema } from './../middleware/ValidateSchema';

const router = express.Router();

router.post('/supporters', ValidateSchema(Schemas.supporter.create), controller.createSupporter);
router.get('/supporters/:supporterId', controller.readSupporter);
router.get('/supporters', controller.readAll);
router.patch('/supporters/:supporterId', ValidateSchema(Schemas.supporter.update), controller.updateSupporter);
router.delete('/supporters/:supporterId', controller.deleteSupporter);

export = router;
