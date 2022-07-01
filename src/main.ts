import { Logger } from "tslog";
import { App } from "./app.js"
import { LoggerService } from "./logger/logger.service.js";
import { UserController } from "./users/user.controller.js";

async function bootstrap() {
    const logger = new LoggerService();
    const app = new App(logger, new UserController(logger));
    await app.init();
}

bootstrap();