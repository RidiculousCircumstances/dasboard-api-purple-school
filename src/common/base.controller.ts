import { LoggerService } from "../logger/logger.service";
import { Router, Response, json } from 'express'
import { IControllerRoute } from "./route.interface";
import { ILoggerService } from "../logger/logger.interface";

export abstract class BaseController {

    private readonly _router : Router;

    get router() {
        return this._router;
    }

    constructor(private logger: ILoggerService) {
        this._router = Router();
        
    }

    private send<T> (res: Response, code: number, message: T) {
        res.type('application/json');
        return res.status(code).json(message);
      
    }

    public ok<T> (res: Response, message: T) {
        return this.send<T>(res, 200, message)
      
    }

    public created (res: Response) {
        return res.sendStatus(201);
    }

    protected bindRoutes(routes: IControllerRoute[]) {
        for(const route of routes) {
            this.logger.log(`[${route.method} ${route.path}]`);
            const handler = route.function.bind(this);
            this.router[route.method](route.path, handler);
        }
    }
}
