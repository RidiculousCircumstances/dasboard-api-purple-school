import { injectable } from 'inversify';
import { Logger } from 'tslog';
import { ILoggerService } from './logger.interface';
import 'reflect-metadata';

@injectable()
export class TestLogger implements ILoggerService {
	logger: Logger;

	log(): void {
		console.log('Логгирую');
	}

	error(): void {
		console.log('ОШИБОЧКА ВЫШЛА');
	}

	warn(): void {
		console.log('ПРЕДУПРЕЖДАЮ');
	}
}
