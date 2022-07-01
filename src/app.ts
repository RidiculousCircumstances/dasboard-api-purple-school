import express, { Express } from 'express'
import { Server } from 'http'
import { LoggerService } from './logger/logger.service';
import { BaseController } from './common/base.controller';
import { UserController } from './users/user.controller';
import { ExeptionFilter } from './errors/exeption.filter';
import { ILoggerService } from './logger/logger.interface';


export class App {

    app: Express;
    server: Server;
    port: number;
    logger: ILoggerService;
    userController: UserController;
    exeptionFilter: ExeptionFilter;

    constructor(
        logger: ILoggerService,
        userController: UserController,
        exeptionFilter: ExeptionFilter,
    ) {
        this.userController = userController;
        this.app = express();
        this.port = 8000;
        this.logger = logger;
        this.exeptionFilter = exeptionFilter;
    }

    useRoutes() {
        this.app.use('/users', this.userController.router);
    }

    useExeptionFilters() {
        this.app.use(this.exeptionFilter.catch.bind(this.exeptionFilter));
    }

    public async init() {
        this.useRoutes();
        this.useExeptionFilters();
        this.server = this.app.listen(this.port);
        this.logger.log(`Server had been started at 127.0.0.1:${this.port}`)
    }

}