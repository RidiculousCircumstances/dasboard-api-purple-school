import { IConfigService } from './config.service.interface';
import { config, DotenvConfigOutput, DotenvParseOutput } from 'dotenv';
import { inject, injectable } from 'inversify';
import { TYPES } from '../types';
import { ILoggerService } from '../logger/logger.interface';

@injectable()
export class ConfigService implements IConfigService {
	private config: DotenvParseOutput;
	constructor(@inject(TYPES.ILoggerService) private logger: ILoggerService) {
		const result: DotenvConfigOutput = config();
		if (result.error) {
			this.logger.error('[ConfigService] Не удалось прочитать файл .env, либо он остутствует');
		} else if (result.parsed != undefined) {
			this.config = result.parsed;
			this.logger.log('[ConfigService] Конфигурация .env успешно загружена');
		} else {
			this.logger.error('[ConfigService] Результат парсинга файла конфигурации вернул undefiend');
		}
	}
	get(key: string): string {
		return this.config[key];
	}
}
