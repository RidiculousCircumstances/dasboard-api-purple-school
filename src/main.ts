import { Container } from "inversify";
import { App } from "./app.js"
import { IExeptionFilter } from "./errors/exeption.filter.interface.js";
import { ExeptionFilter } from "./errors/exeption.filter.js";
import { ILoggerService } from "./logger/logger.interface.js";
import { LoggerService } from "./logger/logger.service.js";
import { TestLogger } from "./logger/test.logger.js";
import { TYPES } from "./types.js";
import { UserController } from "./users/user.controller.js";

    //Injectable говорит, что класс может быть инжектирован, далее, по коду в другом классе, который требует в конструкторе 
    //инстанс injectable класса, через @inject указываем идентификатор injectable класса. при этом конструктор не будет принимать,-
    // вернее, мы не будем передавать в конструктор впоследствии инстанс класса, это сделает inject декоратор. Информация о том, что и куда
    //должно быть инстанциировано, хранится в метадате
    // Важно: если класс A : B, при этом класс A injectable, класс B так же должен быть injectable

    const appContainer = new Container();
    appContainer.bind<ILoggerService>(TYPES.ILoggerService).to(TestLogger); // для интерфейса ILoggerService будет соответствовать 
    //класс LoggerService, и если мы будем где-то делать инжект по символу из TYPES, то мы говорим, что мы должны взять инстанс LoggerService 
    // и положить его туда, куда укажем декоратором
    appContainer.bind<IExeptionFilter>(TYPES.ExeptionFilter).to(ExeptionFilter);
    appContainer.bind<UserController>(TYPES.UserController).to(UserController);
    appContainer.bind<App>(TYPES.Application).to(App);
    const app = appContainer.get<App>(TYPES.Application)
    app.init();


    export { app, appContainer };