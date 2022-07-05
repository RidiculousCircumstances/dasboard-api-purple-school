import { UserModel } from '@prisma/client';
import { UserEntity } from '../user.enity';

export interface IUsersRepository {
	create: (user: UserEntity) => Promise<UserModel>;
	find: (email: string) => Promise<UserModel | null>;
}
