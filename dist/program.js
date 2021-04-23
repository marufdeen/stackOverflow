"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Program = void 0;
const express_1 = __importDefault(require("express"));
const startUp_1 = require("./startUp");
class Program extends startUp_1.Startup {
    constructor() {
        super(express_1.default());
        this.buildConfigurations();
    }
    buildConfigurations() {
        this.useApplicationMiddlewares();
        this.setGlobalRoutesPrefix('/api');
        this.setTestApplicationRoutes();
        this.catchUnknownRoutes();
    }
    Run() {
        this.initialize();
    }
}
exports.Program = Program;
new Program().Run();
//# sourceMappingURL=program.js.map