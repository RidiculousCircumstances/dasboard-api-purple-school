import { App } from "./app.js"
import { ExeptionFilter } from "./errors/exeption.filter.js";
import { LoggerService } from "./logger/logger.service.js";
import { TestLogger } from "./logger/test.logger.js";
import { UserController } from "./users/user.controller.js";

async function bootstrap() {
    const logger = new LoggerService();
    const app = new App(
        logger,
        new UserController(logger),
        new ExeptionFilter(logger)
    );
    await app.init();
}

bootstrap();