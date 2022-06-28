import express, { Express } from 'express'
import { userRouter } from './users/users';
import { Server } from 'http'

export class App {

    app: Express;
    server: Server;
    port: number;

    constructor() {
        this.app = express();
        this.port = 8000;
    }

    useRoutes () {
        this.app.use('/users', userRouter);
    }
    
    public async init () {
        this.useRoutes();
        this.server = this.app.listen(this.port);
        console.log(`Server had been started at 127.0.0.1:${this.port}`)
    }

}