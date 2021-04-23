"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const user_controller_1 = require("../controllers/user.controller");
const validation_pipe_1 = require("../middlewares/validation.pipe");
class UserRoutes extends user_controller_1.UserController {
    constructor() {
        super();
        this.routes = () => {
            this.router.post('/register', validation_pipe_1.useValidatorPipe('REGISTER_USER'), this.registerUserAsync);
            this.router.post('/login', validation_pipe_1.useValidatorPipe('login'), this.loginAsync);
        };
        this.router = express_1.Router();
        this.routes();
    }
}
exports.default = new UserRoutes();
//# sourceMappingURL=user.routes.js.map