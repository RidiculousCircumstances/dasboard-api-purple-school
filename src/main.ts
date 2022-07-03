import { Container, ContainerModule, interfaces } from 'inversify';
import { App } from './app';
import { IExeptionFilter } from './errors/exeption.filter.interface';
import { ExeptionFilter } from './errors/exeption.filter';
import { ILoggerService } from './logger/logger.interface';
import { LoggerService } from './logger/logger.service';
import { TestLogger } from './logger/test.logger';
import { TYPES } from './types';
import { UserController } from './users/user.controller';
import { IUserService } from './users/user.service.interface';
import { UserService } from './users/users.service';
import { IUserController } from './users/user.controller.interface';

//Injectable говорит, что класс может быть инжектирован, далее, по коду в другом классе, который требует в конструкторе
//инстанс injectable класса, через @inject указываем идентификатор injectable класса. при этом конструктор не будет принимать,-
// вернее, мы не будем передавать в конструктор впоследствии инстанс класса, это сделает inject декоратор. Информация о том, что и куда
//должно быть инстанциировано, хранится в метадате
// Важно: если класс A : B, при этом класс A injectable, класс B так же должен быть injectable
export interface IBootstrapReturn {
	appContainer: Container;
	app: App;
}

export const appBindings = new ContainerModule((bind: interfaces.Bind) => {
	// раньше использовался инстанс Container'a, это нецудобно
	// если приложение большое. ContainerModules позволяет алоцировать биндинги логически, помодульно
	bind<ILoggerService>(TYPES.ILoggerService).to(LoggerService);
	bind<IExeptionFilter>(TYPES.IExeptionFilter).to(ExeptionFilter);
	bind<IUserController>(TYPES.IUserController).to(UserController);
	bind<IUserService>(TYPES.IUserService).to(UserService);
	bind<App>(TYPES.Application).to(App);
});

function bootstrap(): IBootstrapReturn {
	const appContainer = new Container();
	appContainer.load(appBindings); // тут загружапем модули биндинга
	const app = appContainer.get<App>(TYPES.Application);
	app.init();
	return { app, appContainer };
}

export const { app, appContainer } = bootstrap();
