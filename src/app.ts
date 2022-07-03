import express, { Express } from 'express';
import { Server } from 'http';
import { ExeptionFilter } from './errors/exeption.filter';
import { ILoggerService } from './logger/logger.interface';
import { inject, injectable } from 'inversify';
import { TYPES } from './types';
import 'reflect-metadata';
import { IUserController } from './users/user.controller.interface';
import { json } from 'body-parser';

@injectable()
export class App {
	app: Express;
	server: Server;
	port: number;

	constructor(
		@inject(TYPES.IUserController) private userController: IUserController,
		@inject(TYPES.ILoggerService) private logger: ILoggerService,
		@inject(TYPES.IExeptionFilter) private exeptionFilter: ExeptionFilter,
	) {
		this.app = express();
		this.port = 8000;
	}

	useMiddleware(): void {
		this.app.use(json());
	}

	useRoutes(): void {
		this.app.use('/users', this.userController.router);
	}

	useExeptionFilters(): void {
		this.app.use(this.exeptionFilter.catch.bind(this.exeptionFilter));
	}

	public async init(): Promise<void> {
		this.useMiddleware();
		this.useRoutes();
		this.useExeptionFilters();
		this.server = this.app.listen(this.port);
		this.logger.log(`Server has been started at 127.0.0.1:${this.port}`);
	}
}
