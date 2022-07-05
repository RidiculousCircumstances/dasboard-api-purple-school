import { UserLoginDto } from './dto/user-login.dto';
import { UserRegisterDto } from './dto/user-register.dto';
import { UserEntity } from './user.enity';
import { IUserService } from './interfaces/user.service.interface';
import 'reflect-metadata';
import { inject, injectable } from 'inversify';
import { IConfigService } from '../config/config.service.interface';
import { TYPES } from '../types';
import { IUsersRepository } from './interfaces/users.repository.interface';
import { UserModel } from '@prisma/client';
// в сервисе идет проверка того, что юзер существует
// если он есть, возвращаем null, иначе - возвращаем нового пользователя
// то есть, тут лежат бизнес-правила. Например, сюда мы можем добавать правило, по которому
// юзеры не могут иметь одинаковый емейл, етк - эти правила могут отличаться, поэтому посредством IoC мы обеспечиваем
// себе простой способ изменять сервис при неизменности остальных модулей.

@injectable()
export class UserService implements IUserService {
	constructor(
		@inject(TYPES.IConfigService) private configService: IConfigService,
		@inject(TYPES.IUsersRepository) private userRepository: IUsersRepository,
	) {}
	async createUser({ email, name, password }: UserRegisterDto): Promise<UserModel | null> {
		const newUser = new UserEntity(email, name);
		const salt = this.configService.get('SALT');
		await newUser.setPassword(password, Number(salt));
		const existedUser = await this.userRepository.find(email);
		if (existedUser) {
			return null;
		} else {
			return this.userRepository.create(newUser);
		}
	}

	async validateUser({ email, password }: UserLoginDto): Promise<boolean> {
		const foundUser = await this.userRepository.find(email);
		if (!foundUser) {
			return false;
		} else {
			const checkedUser = new UserEntity(foundUser.email, foundUser.name, foundUser.password);
			return await checkedUser.comparePassword(password);
		}
	}
}
