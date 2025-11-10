
import express, { Application, Request, Response } from 'express';
import userRouter from '../routes/userRoutes';

const server: Application = express();

server.use(express.json());
server.use('/users', userRouter);

server.get('/', (_req: Request, res: Response) => {
  res.json({ message: 'Hello World!' });
});

export default server;

