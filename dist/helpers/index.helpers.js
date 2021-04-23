"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.generateToken = void 0;
require("dotenv/config");
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const envManager_1 = require("../config/envManager");
const secret = envManager_1.envManager.getEnvValue('JWT_KEY');
const generateToken = (time, payload) => `Bearer ${jsonwebtoken_1.default.sign(payload, secret, { expiresIn: time })}`;
exports.generateToken = generateToken;
//# sourceMappingURL=index.helpers.js.map