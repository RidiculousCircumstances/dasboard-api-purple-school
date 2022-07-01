import { Logger } from "tslog";
import { ILoggerService } from "./logger.interface";

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