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
Object.defineProperty(exports, "__esModule", { value: true });
exports.useValidatorPipe = void 0;
const baseResponse_1 = require("../contracts/baseResponse");
const schema_1 = require("../validation/schema");
const constants_1 = require("../constants/constants");
const useValidatorPipe = (formType, source) => {
    return (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            let data = req.body;
            source == 'query' && (data = req.query);
            source == 'params' && (data = req.params);
            const value = yield schema_1.Schema[formType].validateAsync(data, { abortEarly: false });
            req.body = value;
            next();
        }
        catch (error) {
            return res.status(constants_1.HttpStatusCode.BAD_REQUEST).json(baseResponse_1.makeResponse(null, constants_1.HttpStatusCode.BAD_REQUEST, error.message));
        }
    });
};
exports.useValidatorPipe = useValidatorPipe;
//# sourceMappingURL=validation.pipe.js.map