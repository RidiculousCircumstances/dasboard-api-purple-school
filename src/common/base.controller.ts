import { Router, Response, json } from 'express';
import { ExpressReturnType, IControllerRoute } from './route.interface';
import { ILoggerService } from '../logger/logger.interface';
import { inject, injectable } from 'inversify';
import 'reflect-metadata';
import { TYPES } from '../types';

@injectable()
export abstract class BaseController {
	private readonly _router: Router;

	get router(): Router {
		return this._router;
	}

	constructor(@inject(TYPES.ILoggerService) private logger: ILoggerService) {
		this._router = Router();
	}

	private send<T>(res: Response, code: number, message: T): ExpressReturnType {
		res.type('application/json');
		return res.status(code).json(message);
	}

	public ok<T>(res: Response, message: T): ExpressReturnType {
		return this.send<T>(res, 200, message);
	}

	public created(res: Response): ExpressReturnType {
		return res.sendStatus(201);
	}

	protected bindRoutes(routes: IControllerRoute[]): void {
		for (const route of routes) {
			this.logger.log(`Роут: [${route.method}] ${route.path} успешно зарегистрирован`);
			const middleware = route.middlewares?.map((m) => m.execute.bind(m));
			const handler = route.function.bind(this);
			const pipeline = middleware ? [...middleware, handler] : handler;
			this.router[route.method](route.path, pipeline);
		}
	}
}
