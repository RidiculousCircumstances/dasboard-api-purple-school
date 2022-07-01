import { injectable } from "inversify";
import { Logger } from "tslog";
import { ILoggerService } from "./logger.interface";
import 'reflect-metadata';

@injectable()
export class TestLogger implements ILoggerService {
    logger: Logger;

    log() {
        console.log('Логгирую');
    }

    error() {
        console.log('ОШИБОЧКА ВЫШЛА');
    }

    warn() {
        console.log('ПРЕДУПРЕЖДАЮ');
    }
}