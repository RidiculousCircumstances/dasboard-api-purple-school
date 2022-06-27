import { userRouter } from './users/users.js';
import express, { Request, Response, NextFunction } from 'express';


const port = 8000;
const app = express();

app.use((req, res, next) => {
    console.log(`Текущее время: ${Date.now()}`);
    next();
});
app.use('/users', userRouter);

app.get('/error', (req, res) => {
    throw new Error('Osheebka!!!');
});

app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
    console.log(err.message);
    res.status(500).send(err.message);
});

app.listen(port, () => {
    console.log(`Server had been started at 127.0.0.1:${port}`)
});

