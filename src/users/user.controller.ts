
import { BaseController } from "../common/base.controller";
import { LoggerService } from "../logger/logger.service";
import { Request, Response, NextFunction } from "express";

export class UserController extends BaseController {
    constructor(
        logger: LoggerService
    ) {
        super(logger);
        this.bindRoutes([
            { path: '/register', method: 'post', function: this.register },
            { path: '/login', method: 'post', function: this.login }
        ]);
    }

    login(req: Request, res: Response, next: NextFunction) {
        this.ok(res, 'loged in');
    }

    register(req: Request, res: Response, next: NextFunction) {
        this.ok(res, 'registred');
    }

}