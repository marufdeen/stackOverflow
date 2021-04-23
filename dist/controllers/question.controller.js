"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.QuestionController = void 0;
const question_service_1 = __importDefault(require("../services/question.service"));
class QuestionController extends question_service_1.default {
    constructor() {
        super(...arguments);
        this.askQuestionAsync = (req, res) => __awaiter(this, void 0, void 0, function* () {
            const { id: user_id } = req.user;
            const data = yield this.askQuestionServiceAsync(Object.assign(Object.assign({}, req.body), { user_id }));
            return res.status(data.statusCode).json(data);
        });
        this.retrieveQuesAsync = (_req, res) => __awaiter(this, void 0, void 0, function* () {
            const data = yield this.retrieveQuesServiceAsync();
            return res.status(data.statusCode).json(data);
        });
        this.retrieveOneQuesAsync = (req, res) => __awaiter(this, void 0, void 0, function* () {
            const { ques_id } = req.params;
            const data = yield this.retrieveOneQuesServiceAsync(ques_id);
            return res.status(data.statusCode).json(data);
        });
    }
}
exports.QuestionController = QuestionController;
//# sourceMappingURL=question.controller.js.map