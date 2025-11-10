import express from 'express';
import userRouter from '../routes/userRoutes';
const server = express();
server.use(express.json());
server.use('/users', userRouter);
server.get('/', (_req, res) => {
    res.json({ message: 'Hello World!' });
});
export default server;
