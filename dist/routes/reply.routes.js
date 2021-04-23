"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const reply_controller_1 = require("../controllers/reply.controller");
const validation_pipe_1 = require("../middlewares/validation.pipe");
const jwt_pipe_1 = require("../middlewares/jwt.pipe");
class ReplyRoutes extends reply_controller_1.ReplyController {
    constructor() {
        super();
        this.routes = () => {
            this.router.route('/:question_id')
                .post(jwt_pipe_1.verifyToken, validation_pipe_1.useValidatorPipe('ANSWER_QUES'), this.ansQuestionAsync)
                .get(jwt_pipe_1.verifyToken, this.repliesForQuesAsync);
        };
        this.router = express_1.Router();
        this.routes();
    }
}
exports.default = new ReplyRoutes();
//# sourceMappingURL=reply.routes.js.map