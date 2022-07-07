import { UserModel } from '@prisma/client';
import { Container } from 'inversify';
import { IConfigService } from '../../config/config.service.interface';
import { TYPES } from '../../types';
import { IUserService } from '../interfaces/user.service.interface';
import { IUsersRepository } from '../interfaces/users.repository.interface';
import { UserEntity } from '../user.enity';
import { UserService } from '../users.service';
import 'reflect-metadata';

const configServiceMock: IConfigService = {
	get: jest.fn(),
};

const usersRepositoryMock: IUsersRepository = {
	find: jest.fn(),
	create: jest.fn(),
};

const container = new Container();
let configService: IConfigService;
let usersRepository: IUsersRepository;
let usersService: IUserService;

beforeAll(() => {
	container.bind<IUserService>(TYPES.IUserService).to(UserService);
	container.bind<IConfigService>(TYPES.IConfigService).toConstantValue(configServiceMock);
	container.bind<IUsersRepository>(TYPES.IUsersRepository).toConstantValue(usersRepositoryMock);

	configService = container.get<IConfigService>(TYPES.IConfigService);
	usersRepository = container.get<IUsersRepository>(TYPES.IUsersRepository);
	usersService = container.get<IUserService>(TYPES.IUserService);
});

let createdUser: UserModel | null;

describe('User Service', () => {
	it('createUser', async () => {
		configService.get = jest.fn().mockReturnValueOnce('1'); // получили соль
		usersRepository.create = jest.fn().mockImplementationOnce(
			// создали юзера в бд
			(user: UserEntity): UserModel => ({
				name: user.name,
				email: user.email,
				password: user.password,
				id: 1,
			}),
		);
		createdUser = await usersService.createUser({
			email: 'a@a.ru',
			name: 'Carl',
			password: '1',
		});
		expect(createdUser?.id).toEqual(1);
		expect(createdUser?.password).not.toEqual('1');
	});

	it('validateUser - success', async () => {
		usersRepository.find = jest.fn().mockReturnValueOnce(createdUser);
		const result = await usersService.validateUser({
			email: 'a@a.ru',
			password: '1',
		});
		expect(result).toBeTruthy();
	});

	it('validateUser - wrong password', async () => {
		usersRepository.find = jest.fn().mockReturnValueOnce(createdUser);
		const result = await usersService.validateUser({
			email: 'a@a.ru',
			password: '2',
		});
		expect(result).toBeFalsy();
	});

	it('validateUser - wrong user', async () => {
		usersRepository.find = jest.fn().mockReturnValueOnce(null);
		const result = await usersService.validateUser({
			email: 'a2@a.ru',
			password: '2',
		});
		expect(result).toBeFalsy();
	});
});
