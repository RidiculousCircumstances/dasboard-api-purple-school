"use strict";
exports.__esModule = true;
exports.userRouter = void 0;
var express_1 = require("express");
var userRouter = express_1["default"].Router();
exports.userRouter = userRouter;
userRouter.use(function (req, res, next) {
    console.log("\u041F\u043E\u043B\u044C\u0437\u043E\u0432\u0430\u0442\u0435\u043B\u044C \u043E\u0431\u0440\u0430\u0431\u043E\u0442\u0430\u043D");
    next();
});
userRouter.post('/login', function (req, res) {
    res.send('loged in');
});
userRouter.post('/register', function (req, res) {
    res.send('registred');
});
