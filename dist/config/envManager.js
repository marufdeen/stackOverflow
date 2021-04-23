"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.envManager = exports.EnvManager = void 0;
require("dotenv/config");
const fs_1 = __importDefault(require("fs"));
const path_1 = __importDefault(require("path"));
class EnvManager {
    constructor(env) {
        this.env = env;
    }
    expectedEnvValues() {
        const program = ['APP_ENV', 'APP_PORT'];
        return program;
    }
    writeEnvFile() {
        const fileExist = fs_1.default.existsSync(path_1.default.resolve(__dirname, '../../.env'));
        if (!fileExist) {
            fs_1.default.writeFileSync(path_1.default.resolve(__dirname, '../../.env'), '.env');
        }
        return new EnvManager(process.env);
    }
    getEnvValue(key, throwOnMissing = true) {
        const value = this.env[key];
        if (!value && throwOnMissing) {
            throw new Error(`\tmissing env.${key}.\n \n\tPlease add ${key} in .env file\n`);
        }
        return value;
    }
    getApplicationPort() {
        return parseInt(this.getEnvValue('APP_PORT'), 10);
    }
    ensureEnvValues() {
        this.expectedEnvValues().forEach(k => this.getEnvValue(k, true));
        return new EnvManager(process.env);
    }
    isProduction() {
        const mode = this.getEnvValue('APP_ENV', false);
        return mode != 'development';
    }
}
exports.EnvManager = EnvManager;
const envManager = new EnvManager(process.env).writeEnvFile()
    .ensureEnvValues();
exports.envManager = envManager;
//# sourceMappingURL=envManager.js.map