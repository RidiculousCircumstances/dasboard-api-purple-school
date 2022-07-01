
import { BaseController } from "../common/base.controller";
import { LoggerService } from "../logger/logger.service";
import { Request, Response, NextFunction } from "express";
import { HTTPError } from "../errors/http.error.class";
import { ILoggerService } from "../logger/logger.interface";
import { inject, injectable } from "inversify";
import { TYPES } from "../types";
import 'reflect-metadata';
 
@injectable()
export class UserController extends BaseController {
    constructor(@inject(TYPES.ILoggerService) private loggerService: ILoggerService) {
        super(loggerService);
        this.bindRoutes([
            { path: '/register', method: 'post', function: this.register },
            { path: '/login', method: 'post', function: this.login }
        ]);
    }

    login(req: Request, res: Response, next: NextFunction) {
        next(new HTTPError(401, 'ИДИ НА ХУЙ ХУЙЛО НЕАВТОРИЗОВАННОЕ', 'login'));
        
    }

    register(req: Request, res: Response, next: NextFunction) {
        this.ok(res, 'registred');
       
    }

}