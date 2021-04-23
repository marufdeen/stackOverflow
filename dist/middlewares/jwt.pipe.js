"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
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
exports.verifyToken = void 0;
const dotenv_1 = require("dotenv");
const JWT = __importStar(require("jsonwebtoken"));
const constants_1 = require("../constants/constants");
const baseResponse_1 = require("../contracts/baseResponse");
const envManager_1 = require("../config/envManager");
const index_1 = __importDefault(require("../models/index"));
const User = index_1.default.User;
dotenv_1.config();
const secret = envManager_1.envManager.getEnvValue('JWT_KEY');
const verifyToken = (req, res, next) => {
    try {
        let tokenBearer = req.headers.authorization;
        if (!tokenBearer)
            return res
                .status(constants_1.HttpStatusCode.FORBIDEN)
                .json(baseResponse_1.makeResponse(null, constants_1.HttpStatusCode.FORBIDEN, 'Client key is required'));
        const token = tokenBearer.split(' ')[1];
        JWT.verify(token, secret, (err, decoded) => __awaiter(void 0, void 0, void 0, function* () {
            if ((err && err.name) === 'TokenExpiredError') {
                return res
                    .status(constants_1.HttpStatusCode.FORBIDEN)
                    .json(baseResponse_1.makeResponse(null, constants_1.HttpStatusCode.FORBIDEN, 'Client key is expired'));
            }
            if (err)
                return res
                    .status(constants_1.HttpStatusCode.FORBIDEN)
                    .json(baseResponse_1.makeResponse(null, constants_1.HttpStatusCode.FORBIDEN, 'Client key is invalid'));
            const user = (yield User.findOne({ where: { id: decoded.id } }));
            if (!user) {
                return res
                    .status(constants_1.HttpStatusCode.FORBIDEN)
                    .json(baseResponse_1.makeResponse(null, constants_1.HttpStatusCode.FORBIDEN, 'Access rejected'));
            }
            req.user = user;
            next();
        }));
    }
    catch (error) {
        return res
            .status(constants_1.HttpStatusCode.INTERNAL_ERROR)
            .json(baseResponse_1.makeResponse(null, constants_1.HttpStatusCode.INTERNAL_ERROR, error.message));
    }
};
exports.verifyToken = verifyToken;
//# sourceMappingURL=jwt.pipe.js.map