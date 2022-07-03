import { IsEmail, IsNotEmpty, IsString, MinLength } from 'class-validator';

export class UserRegisterDto {
	@IsEmail({}, { message: 'Email указан неверено' })
	email: string;
	@MinLength(8, { message: 'Пароль должен состоять как минимум из 8 символов' })
	@IsString()
	@IsNotEmpty({ message: 'Не указан пароль' })
	password: string;
	@IsString()
	@IsNotEmpty({ message: 'Не указано имя' })
	name: string;
}
