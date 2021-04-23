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
const Vote = index_1.default.Vote;
const User = index_1.default.User;
const Reply = index_1.default.Reply;
class VoteServices {
    constructor() {
        this.voteServiceAsync = (vote_dto) => __awaiter(this, void 0, void 0, function* () {
            try {
                const { vote_by, reply_id, type } = vote_dto;
                const [user, reply, vote] = yield Promise.all([
                    User.findOne({
                        where: { id: vote_by },
                    }),
                    Reply.findOne({ where: { id: reply_id } }),
                    Vote.findOne({ where: { vote_by, reply_id } })
                ]);
                if (!user) {
                    return baseResponse_1.makeResponse(null, constants_1.HttpStatusCode.NOT_FOUND, 'User not found');
                }
                if (!reply) {
                    return baseResponse_1.makeResponse(null, constants_1.HttpStatusCode.NOT_FOUND, 'Answer/Reply not found');
                }
                if (!vote) {
                    const new_vote = yield Vote.create(vote_dto);
                    return baseResponse_1.makeResponse(new_vote);
                }
                vote.type = type;
                yield vote.save();
                return baseResponse_1.makeResponse(vote);
            }
            catch (error) {
                return baseResponse_1.makeResponse(null, constants_1.HttpStatusCode.INTERNAL_ERROR, error.message);
            }
        });
    }
}
exports.default = VoteServices;
//# sourceMappingURL=vote.service.js.map