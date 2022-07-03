import { UserLoginDto } from './dto/user-login.dto';
import { UserRegisterDto } from './dto/user-register.dto';
import { UserEntity } from './user.enity';
import { IUserService } from './user.service.interface';
import 'reflect-metadata';
import { injectable } from 'inversify';
// в сервисе идет проверка того, что юзер существует
// если он есть, возвращаем null, иначе - возвращаем нового пользователя
// то есть, тут лежат бизнес-правила. Например, сюда мы можем добавать правило, по которому
// юзеры не могут иметь одинаковый емейл, етк - эти правила могут отличаться, поэтому посредством IoC мы обеспечиваем
// себе простой способ изменять сервис при неизменности остальных модулей.

@injectable()
export class UserService implements IUserService {
	async createUser({ email, name, password }: UserRegisterDto): Promise<UserEntity | null> {
		const newUser = new UserEntity(email, name);
		await newUser.setPassword(password);
		return null;
	}

	async validateUser(dto: UserLoginDto): Promise<boolean> {
		return true;
	}
}
