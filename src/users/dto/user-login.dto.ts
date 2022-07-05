import { IsEmail, IsNotEmpty, IsString } from 'class-validator';

export class UserLoginDto {
	@IsEmail({}, { message: 'Email указан неверено' })
	email: string;
	@IsString({ message: 'не введен пароль' })
	password: string;
}
