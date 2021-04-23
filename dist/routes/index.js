"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const user_routes_1 = __importDefault(require("./user.routes"));
const question_routes_1 = __importDefault(require("./question.routes"));
const reply_routes_1 = __importDefault(require("./reply.routes"));
const vote_routes_1 = __importDefault(require("./vote.routes"));
class Routes {
    constructor() {
        this.applicationRoutes = () => {
            this.router.use('/users', user_routes_1.default.router);
            this.router.use('/questions', question_routes_1.default.router);
            this.router.use('/replies', reply_routes_1.default.router);
            this.router.use('/votes', vote_routes_1.default.router);
        };
        this.router = express_1.Router();
        this.applicationRoutes();
    }
}
exports.default = new Routes();
//# sourceMappingURL=index.js.map