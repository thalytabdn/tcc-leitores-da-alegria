import express from 'express';
import controller from '../controllers/Event';
import { Schemas, ValidateSchema } from './../middleware/ValidateSchema';

const router = express.Router();

//add validate
router.post('/events', controller.createEvent);
router.get('/events/:eventId', controller.readEvent);
router.get('/events', controller.readAll);
router.patch('/events/:eventId', controller.updateEvent);
router.delete('/events/:eventId', controller.deleteEvent);

export = router;
