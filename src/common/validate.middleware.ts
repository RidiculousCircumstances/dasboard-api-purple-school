import { IMiddleware } from './interfaces/middleware.interface';
import { NextFunction, Request, Response } from 'express';
import { ClassConstructor, plainToClass } from 'class-transformer';
import { validate } from 'class-validator';
// инстаниирует класс из полученного объекта body, чтобы в дальнейшем провести валидацию class-validator'ом.
//class-transform нужен, чтобы создать экземпляр класса из объекта, иначе нам пришолсь бы делать это вручную
export class ValidateMiddleware implements IMiddleware {
	constructor(private classToValidate: ClassConstructor<object>) {}
	execute({ body }: Request, res: Response, next: NextFunction): void {
		const instance = plainToClass(this.classToValidate, body);
		validate(instance).then((errors) => {
			if (errors.length != 0) {
				res.status(422).send(errors);
			} else {
				next();
			}
		});
	}
}
