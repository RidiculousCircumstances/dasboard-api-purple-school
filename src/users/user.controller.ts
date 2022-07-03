import { BaseController } from '../common/base.controller';
import { LoggerService } from '../logger/logger.service';
import { Request, Response, NextFunction } from 'express';
import { HTTPError } from '../errors/http.error.class';
import { ILoggerService } from '../logger/logger.interface';
import { inject, injectable } from 'inversify';
import { TYPES } from '../types';
import 'reflect-metadata';
import { IUserController } from './user.controller.interface';
import { UserLoginDto } from './dto/user-login.dto';
import { UserRegisterDto } from './dto/user-register.dto';
import { IUserService } from './user.service.interface';
import { ValidateMiddleware } from '../common/validate.middleware';

// В контроллере находится логика обработки результата ответа от сервиса: то есть,
// здесь расположены правила, по которым, в зависимости от того, какие данные вернет сервис,
// контроллер будет отправлять ответ клиенту, при этом результат может быть предварительно преобразован. Например, не весь результат.
// также здесь используется мидлвейры, например, для валидации полученных данных.
@injectable()
export class UserController extends BaseController implements IUserController {
	constructor(
		@inject(TYPES.ILoggerService) private loggerService: ILoggerService,
		@inject(TYPES.IUserService) private userService: IUserService,
	) {
		super(loggerService);
		this.bindRoutes([
			{
				path: '/register',
				method: 'post',
				function: this.register,
				middlewares: [new ValidateMiddleware(UserRegisterDto)], //Прицепляем валидартор для валидации посредством декораторов
			},
			{ path: '/login', method: 'post', function: this.login },
		]);
	}

	login(req: Request<{}, {}, UserLoginDto>, res: Response, next: NextFunction): void {
		console.log(req.body);
		next(new HTTPError(401, 'Ошибка авторизации', 'login'));
	}

	async register(
		{ body }: Request<{}, {}, UserRegisterDto>,
		res: Response,
		next: NextFunction,
	): Promise<void> {
		const result = await this.userService.createUser(body);
		if (!result) {
			return next(new HTTPError(422, 'Такой пользователь уже существует'));
		}
		this.ok(res, result);
	}
}
