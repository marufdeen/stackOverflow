"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Schema = void 0;
const joi_1 = __importDefault(require("joi"));
const constants_1 = require("../constants/constants");
exports.Schema = {
    event: joi_1.default.object({}),
    REGISTER_USER: joi_1.default.object({
        email: joi_1.default.string().email({ minDomainSegments: 2 }),
        username: joi_1.default.string().alphanum().min(3).max(30).required(),
        password: joi_1.default.string().min(8).max(15).pattern(new RegExp('^[a-zA-Z0-9]{3,30}$')),
    }).required(),
    login: joi_1.default.object({
        email: joi_1.default.string().email({ minDomainSegments: 2 }),
        password: joi_1.default.string().pattern(new RegExp('^[a-zA-Z0-9]{3,30}$')),
    }).required(),
    ASK_QUES: joi_1.default.object({
        title: joi_1.default.string().required(),
        ques_body: joi_1.default.string().required()
    }).required(),
    VOTE_ANS: joi_1.default.object({
        type: joi_1.default.string()
            .valid(...Object.values(constants_1.VOTE_TYPE))
            .required()
    }).required(),
    ANSWER_QUES: joi_1.default.object({
        ans_body: joi_1.default.string().required()
    }).required(),
};
//# sourceMappingURL=schema.js.map