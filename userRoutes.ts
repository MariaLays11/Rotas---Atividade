
import { Router } from 'express';
import UserController from '../controllers/UserController';

const userRouter = Router();


userRouter.post('/', UserController.create);
userRouter.get('/', UserController.getAll);
userRouter.get('/:id', UserController.getOne);
userRouter.put('/:id', UserController.update);
userRouter.delete('/:id', UserController.delete);

export default userRouter;

