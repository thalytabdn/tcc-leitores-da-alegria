import express from 'express';
import controller from '../controllers/User';
import ROLES from '../models/interfaces/roles';
import { extractJWT, verifyPermission } from '../middleware/extractJWT';
import { Schemas, ValidateSchema } from './../middleware/ValidateSchema';

const { ADMIN, EDITOR } = ROLES;
const router = express.Router();
router.use(express.json());

router.post('/register', ValidateSchema(Schemas.user.create), controller.register);
router.post('/login', controller.loginUser);

router.get('/users/token', controller.getByToken);
router.get('/users/:userId', controller.readUser);
router.get('/users', controller.readAll);
router.patch('/users/:userId', controller.updateUser);
router.delete('/users/:userId', controller.deleteUser);

router.post('/forgetPassword', ValidateSchema(Schemas.user.forgetPassword), controller.forgetPassword);
router.post('/resetPassword/:id', controller.resetPassword);

export = router;
