import { BaseController } from '../common/base.controller';
import { LoggerService } from '../logger/logger.service';
import { Request, Response, NextFunction } from 'express';
import { HTTPError } from '../errors/http.error.class';
import { ILoggerService } from '../logger/logger.interface';
import { inject, injectable } from 'inversify';
import { TYPES } from '../types';
import 'reflect-metadata';
import { IUserController } from './user.controller..interface';

@injectable()
export class UserController extends BaseController implements IUserController {
	constructor(@inject(TYPES.ILoggerService) private loggerService: ILoggerService) {
		super(loggerService);
		this.bindRoutes([
			{ path: '/register', method: 'post', function: this.register },
			{ path: '/login', method: 'post', function: this.login },
		]);
	}

	login(req: Request, res: Response, next: NextFunction): void {
		next(new HTTPError(401, 'Ошибка авторизации', 'login'));
	}

	register(req: Request, res: Response, next: NextFunction): void {
		this.ok(res, 'registred');
	}
}
