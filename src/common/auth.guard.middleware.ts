import { IMiddleware } from './interfaces/middleware.interface';
import { Request, Response, NextFunction } from 'express';
import { HTTPError } from '../errors/http.error.class';

export class AuthGuardMiddleware implements IMiddleware {
	execute(req: Request, res: Response, next: NextFunction): void {
		if (req.user) {
			return next();
		}
		return next(new HTTPError(401, 'Вы не авторизованы', 'AuthGuard'));
	}
}
