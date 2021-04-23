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
const Reply = index_1.default.Reply;
class ReplyServices {
    constructor() {
        this.ansQuestionServiceAsync = (ans_dto) => __awaiter(this, void 0, void 0, function* () {
            try {
                const { ans_by, ans_body, question_id } = ans_dto;
                const reply = yield Reply.findOne({
                    where: { ans_by: ans_by, question_id, ans_body },
                });
                if (reply) {
                    return baseResponse_1.makeResponse(null, constants_1.HttpStatusCode.CONFLICT, 'This answer already exist');
                }
                const new_reply = yield Reply.create(ans_dto);
                return baseResponse_1.makeResponse(new_reply);
            }
            catch (error) {
                return baseResponse_1.makeResponse(null, constants_1.HttpStatusCode.INTERNAL_ERROR, error.message);
            }
        });
        this.repliesForQuesServiceAsync = (ques_id) => __awaiter(this, void 0, void 0, function* () {
            try {
                const reply_data = yield Reply.findAll({ where: { question_id: ques_id } });
                return baseResponse_1.makeResponse(reply_data);
            }
            catch (error) {
                return baseResponse_1.makeResponse(null, constants_1.HttpStatusCode.INTERNAL_ERROR, error.message);
            }
        });
    }
}
exports.default = ReplyServices;
//# sourceMappingURL=reply.service.js.map