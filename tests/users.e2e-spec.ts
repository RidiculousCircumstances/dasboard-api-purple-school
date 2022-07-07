import { App } from '../src/app';
import { boot } from '../src/main';
import request from 'supertest';
import { notContains } from 'class-validator';

let application: App;

beforeAll(async () => {
	const { app } = await boot;
	application = app; // получили инстанс прилоджения
});

describe('Users e2e', () => {
	it('Register - error', async () => {
		const result = await request(application.app).post('/users/register').send({
			email: 'a@a.ru',
			password: '11111111',
			name: 'wtf',
		});
		expect(result.statusCode).toBe(422);
	});
	it('Login - success', async () => {
		const result = await request(application.app).post('/users/login').send({
			email: 'a@a.ru',
			password: '11111111',
		});
		expect(result.body.Jwt).not.toBeUndefined;
	});
	it('Login - failure', async () => {
		const result = await request(application.app).post('/users/login').send({
			email: 'a@a.ru',
			password: '1111111',
		});
		expect(result.statusCode).toBe(401);
	});
	it('Info - success', async () => {
		const { body } = await request(application.app).post('/users/login').send({
			email: 'a@a.ru',
			password: '11111111',
		});
		const result = await request(application.app)
			.get('/users/info')
			.set('Authorization', `Bearer ${body.jwt}`);
		expect(result.body.email).toBe('a@a.ru');
	});
	it('Info - failure', async () => {
		const result = await request(application.app)
			.get('/users/info')
			.set('Authorization', `Bearer 1`);
		expect(result.statusCode).toBe(401);
	});
});

afterAll(() => {
	application.close();
});
