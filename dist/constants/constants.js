"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.USER_TOKEN_EXPIRE_TIME = exports.VOTE_TYPE = exports.HttpStatusCode = void 0;
const envManager_1 = require("../config/envManager");
var HttpStatusCode;
(function (HttpStatusCode) {
    HttpStatusCode[HttpStatusCode["OK"] = 200] = "OK";
    HttpStatusCode[HttpStatusCode["CREATED"] = 201] = "CREATED";
    HttpStatusCode[HttpStatusCode["NO_CONTENT"] = 204] = "NO_CONTENT";
    HttpStatusCode[HttpStatusCode["NOT_MODIFIED"] = 304] = "NOT_MODIFIED";
    HttpStatusCode[HttpStatusCode["BAD_REQUEST"] = 400] = "BAD_REQUEST";
    HttpStatusCode[HttpStatusCode["UNAUTHORIZED"] = 401] = "UNAUTHORIZED";
    HttpStatusCode[HttpStatusCode["PAYMENT_REQUIRED"] = 402] = "PAYMENT_REQUIRED";
    HttpStatusCode[HttpStatusCode["FORBIDEN"] = 403] = "FORBIDEN";
    HttpStatusCode[HttpStatusCode["NOT_FOUND"] = 404] = "NOT_FOUND";
    HttpStatusCode[HttpStatusCode["CONFLICT"] = 409] = "CONFLICT";
    HttpStatusCode[HttpStatusCode["VALIDATION_ERROR"] = 422] = "VALIDATION_ERROR";
    HttpStatusCode[HttpStatusCode["NOT_PROCCESSED"] = 422] = "NOT_PROCCESSED";
    HttpStatusCode[HttpStatusCode["INTERNAL_ERROR"] = 500] = "INTERNAL_ERROR";
})(HttpStatusCode = exports.HttpStatusCode || (exports.HttpStatusCode = {}));
var VOTE_TYPE;
(function (VOTE_TYPE) {
    VOTE_TYPE["THUMBS_UP"] = "THUMBS_UP";
    VOTE_TYPE["THUMBS_DOWN"] = "THUMBS_DOWN";
})(VOTE_TYPE = exports.VOTE_TYPE || (exports.VOTE_TYPE = {}));
exports.USER_TOKEN_EXPIRE_TIME = envManager_1.envManager.getEnvValue('TOKEN_EXPIRE');
//# sourceMappingURL=constants.js.map