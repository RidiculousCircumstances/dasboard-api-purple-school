import express, { Express } from 'express'
import { Server } from 'http'
import { LoggerService } from './logger/logger.service';
import { BaseController } from './common/base.controller';
import { UserController } from './users/user.controller';

export class App {

    app: Express;
    server: Server;
    port: number;
    logger: LoggerService;
    userController: BaseController;

    constructor(
        logger: LoggerService,
        userController: UserController
        ) {
        this.userController = userController;
        this.app = express();
        this.port = 8000;
        this.logger = logger;
    }

    useRoutes () {
        this.app.use('/users', this.userController.router);
    }
    
    public async init () {
        this.useRoutes();
        this.server = this.app.listen(this.port);
        this.logger.log(`Server had been started at 127.0.0.1:${this.port}`)
    }

}