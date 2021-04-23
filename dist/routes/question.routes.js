"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const question_controller_1 = require("../controllers/question.controller");
const validation_pipe_1 = require("../middlewares/validation.pipe");
const jwt_pipe_1 = require("../middlewares/jwt.pipe");
class QuestionRoutes extends question_controller_1.QuestionController {
    constructor() {
        super();
        this.routes = () => {
            this.router.route('/')
                .post(jwt_pipe_1.verifyToken, validation_pipe_1.useValidatorPipe('ASK_QUES'), this.askQuestionAsync)
                .get(jwt_pipe_1.verifyToken, this.retrieveQuesAsync);
            this.router.get('/:ques_id', jwt_pipe_1.verifyToken, this.retrieveOneQuesAsync);
        };
        this.router = express_1.Router();
        this.routes();
    }
}
exports.default = new QuestionRoutes();
//# sourceMappingURL=question.routes.js.map