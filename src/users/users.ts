import express from 'express';

const userRouter = express.Router();

userRouter.use((req, res, next) => {
    console.log(`Пользователь обработан`);
    next();
});

userRouter.post('/login', (req, res) => {
    res.send('loged in');
});

userRouter.post('/register', (req, res) => {
    res.send('registred');
});

export { userRouter };