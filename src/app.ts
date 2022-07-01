import express, { Express } from 'express'
import { Server } from 'http'
import { UserController } from './users/user.controller';
import { ExeptionFilter } from './errors/exeption.filter';
import { ILoggerService } from './logger/logger.interface';
import { inject, injectable } from 'inversify';
import { TYPES } from './types';
import 'reflect-metadata';

@injectable()
export class App {

    app: Express;
    server: Server;
    port: number;

    constructor(
        @inject(TYPES.UserController) private userController: UserController,
        @inject(TYPES.ILoggerService) private logger: ILoggerService,
        @inject(TYPES.ExeptionFilter) private exeptionFilter: ExeptionFilter,
        )
    {
        this.app = express();
        this.port = 8000;
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