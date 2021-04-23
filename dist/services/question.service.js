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
const index_1 = __importDefault(require("../models/index"));
const baseResponse_1 = require("../contracts/baseResponse");
const constants_1 = require("../constants/constants");
const Question = index_1.default.Question;
class QuestionServices {
    constructor() {
        this.askQuestionServiceAsync = (ques_dto) => __awaiter(this, void 0, void 0, function* () {
            try {
                const question = yield Question.findOne({
                    where: { title: ques_dto.title },
                });
                if (question) {
                    return baseResponse_1.makeResponse(null, constants_1.HttpStatusCode.CONFLICT, 'This question already exist');
                }
                const new_ques = yield Question.create(ques_dto);
                return baseResponse_1.makeResponse(new_ques);
            }
            catch (error) {
                return baseResponse_1.makeResponse(null, constants_1.HttpStatusCode.INTERNAL_ERROR, error.message);
            }
        });
        this.retrieveQuesServiceAsync = () => __awaiter(this, void 0, void 0, function* () {
            try {
                const questions_data = yield Question.findAll();
                return baseResponse_1.makeResponse(questions_data);
            }
            catch (error) {
                return baseResponse_1.makeResponse(null, constants_1.HttpStatusCode.INTERNAL_ERROR, error.message);
            }
        });
        this.retrieveOneQuesServiceAsync = (ques_id) => __awaiter(this, void 0, void 0, function* () {
            try {
                const question_data = yield Question.findOne({ where: { id: ques_id } });
                if (!question_data)
                    return baseResponse_1.makeResponse(question_data, constants_1.HttpStatusCode.NOT_FOUND, 'Question not found');
                return baseResponse_1.makeResponse(question_data);
            }
            catch (error) {
                return baseResponse_1.makeResponse(null, constants_1.HttpStatusCode.INTERNAL_ERROR, error.message);
            }
        });
    }
}
exports.default = QuestionServices;
//# sourceMappingURL=question.service.js.map