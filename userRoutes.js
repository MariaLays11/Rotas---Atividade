import { Router } from 'express';
import UserController from '../controllers/UserController.js';
const userRouter = Router();
userRouter.post('/users', UserController.create);
userRouter.delete('/users/:id', UserController.delete);
export default userRouter;
