import { Schemas, ValidateSchema } from './../middleware/ValidateSchema';
import express from 'express';
import controller from '../controllers/AudioBook';

const router = express.Router();

router.post('/audioBooks', ValidateSchema(Schemas.audioBook.create), controller.createAudioBook);
router.get('/audioBooks/:audioBookId', controller.readAudioBook);
router.get('/audioBooks', controller.readAll);
router.patch('/audioBooks/:audioBookId', ValidateSchema(Schemas.audioBook.update), controller.updateAudioBook);
router.delete('/audioBooks/:audioBookId', controller.deleteAudioBook);

export = router;
