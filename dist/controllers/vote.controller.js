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
exports.VoteController = void 0;
const vote_service_1 = __importDefault(require("../services/vote.service"));
class VoteController extends vote_service_1.default {
    constructor() {
        super(...arguments);
        this.voteAsync = (req, res) => __awaiter(this, void 0, void 0, function* () {
            const { reply_id } = req.params;
            const { id: vote_by } = req.user;
            const data = yield this.voteServiceAsync(Object.assign(Object.assign({}, req.body), { reply_id, vote_by }));
            return res.status(data.statusCode).json(data);
        });
    }
}
exports.VoteController = VoteController;
//# sourceMappingURL=vote.controller.js.map