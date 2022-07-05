import { hash, compare } from 'bcryptjs';

export class UserEntity {
	private _password: string;
	constructor(
		private readonly _email: string,
		private readonly _name: string,
		hashedPass?: string,
	) {
		if (hashedPass) {
			this._password = hashedPass;
		}
	}

	get name(): string {
		return this._name;
	}

	get email(): string {
		return this._email;
	}

	get password(): string {
		return this._password;
	}

	public async setPassword(pass: string, salt: number): Promise<void> {
		this._password = await hash(pass, salt);
	}

	public async comparePassword(pass: string): Promise<boolean> {
		return await compare(pass, this._password);
	}
}
