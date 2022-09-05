import express from 'express';
import controller from '../controllers/Member';
import { Schemas, ValidateSchema } from './../middleware/ValidateSchema';

const router = express.Router();

router.post('/members', ValidateSchema(Schemas.member.create), controller.createMember);
router.get('/members/:memberId', controller.readMember);
router.get('/members', controller.readAll);
router.patch('/members/:memberId', ValidateSchema(Schemas.member.update), controller.updateMember);
router.delete('/members/:memberId', controller.deleteMember);

export = router;
