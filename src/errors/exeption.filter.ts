import { NextFunction, Request, Response } from 'express';
import { inject, injectable } from 'inversify';
import { ILoggerService } from '../logger/logger.interface';
import { LoggerService } from '../logger/logger.service';
import { TYPES } from '../types';
import { IExeptionFilter } from './exeption.filter.interface';
import { HTTPError } from './http.error.class';
import 'reflect-metadata';

@injectable()
export class ExeptionFilter implements IExeptionFilter {
	// logger: LoggerService;

	// constructor(logger: LoggerService) {
	//     this.logger = logger;
	// }

	constructor(@inject(TYPES.ILoggerService) private logger: ILoggerService) {}

	catch(err: Error | HTTPError, req: Request, res: Response, next: NextFunction): void {
		if (err instanceof HTTPError) {
			this.logger.error(`[${err.context}] Ошибка ${err.statusCode}: ${err.message}`);
			res.status(err.statusCode).send({ err: err.message });
		} else {
			this.logger.error(`${err.message}`);
			res.status(500).send({ err: err.message });
		}
	}
}
