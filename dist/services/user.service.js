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
const index_helpers_1 = require("../helpers/index.helpers");
const User = index_1.default.User;
class UserServices {
    constructor() {
        this.loginUserServiceAsync = (loginDTO) => __awaiter(this, void 0, void 0, function* () {
            try {
                const user = yield User.findOne({
                    where: { email: loginDTO.email },
                });
                if (!user) {
                    return baseResponse_1.makeResponse(null, constants_1.HttpStatusCode.UNAUTHORIZED, 'Email or Password is not correct');
                }
                const passwordMatch = yield User.comparePassword(loginDTO.password, user);
                if (!passwordMatch) {
                    return baseResponse_1.makeResponse(null, constants_1.HttpStatusCode.UNAUTHORIZED, 'Email or Password is incorrect');
                }
                user.token = index_helpers_1.generateToken(constants_1.USER_TOKEN_EXPIRE_TIME, {
                    id: user.id
                });
                return baseResponse_1.makeResponse(user);
            }
            catch (error) {
                return baseResponse_1.makeResponse(null, constants_1.HttpStatusCode.INTERNAL_ERROR, error.message);
            }
        });
        this.registerUserServiceAsync = (registerDTO) => __awaiter(this, void 0, void 0, function* () {
            try {
                const user_data = yield User.findOne({ where: { email: registerDTO.email } });
                if (user_data) {
                    return baseResponse_1.makeResponse(null, constants_1.HttpStatusCode.CONFLICT, 'Email already exist');
                }
                const new_user_data = yield User.create(registerDTO);
                new_user_data.token = index_helpers_1.generateToken(constants_1.USER_TOKEN_EXPIRE_TIME, {
                    id: new_user_data.id
                });
                return baseResponse_1.makeResponse(new_user_data, constants_1.HttpStatusCode.OK);
            }
            catch (error) {
                return baseResponse_1.makeResponse(null, constants_1.HttpStatusCode.INTERNAL_ERROR, error.message);
            }
        });
    }
}
exports.default = UserServices;
//# sourceMappingURL=user.service.js.map