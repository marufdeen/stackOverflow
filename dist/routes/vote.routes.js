"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const vote_controller_1 = require("../controllers/vote.controller");
const validation_pipe_1 = require("../middlewares/validation.pipe");
const jwt_pipe_1 = require("../middlewares/jwt.pipe");
class VoteRoutes extends vote_controller_1.VoteController {
    constructor() {
        super();
        this.routes = () => {
            this.router.patch('/:reply_id', jwt_pipe_1.verifyToken, validation_pipe_1.useValidatorPipe('VOTE_ANS'), this.voteAsync);
        };
        this.router = express_1.Router();
        this.routes();
    }
}
exports.default = new VoteRoutes();
//# sourceMappingURL=vote.routes.js.map