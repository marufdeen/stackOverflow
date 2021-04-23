"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
require("dotenv/config");
const fs_1 = __importDefault(require("fs"));
const path_1 = __importDefault(require("path"));
const sequelize_1 = require("sequelize");
const envManager_1 = require("../config/envManager");
const sequelize_json_1 = __importDefault(require("../sequelize.json"));
const mode = envManager_1.envManager.getEnvValue('APP_ENV');
const config = sequelize_json_1.default[mode];
const sequelize = new sequelize_1.Sequelize(config.database, config.username, config.password, Object.assign(Object.assign({}, config), { dialect: 'mysql' }));
const db = {};
const basename = path_1.default.basename(module.filename);
fs_1.default.readdirSync(__dirname)
    .filter((file) => {
    return file.indexOf('.') !== 0 && file !== basename && file.slice(-3) === '.js';
})
    .forEach((file) => {
    const model = sequelize.import(path_1.default.join(__dirname, file));
    db[model.name] = model;
});
Object.keys(db).forEach((modelName) => {
    if (db[modelName].associate) {
        db[modelName].associate(db);
    }
});
db.sequelize = sequelize;
db.Sequelize = sequelize_1.Sequelize;
const resolvedConnection = () => console.info('Connected to database!');
const rejectedConnection = (error) => console.info(`Failed to connect. Error: ${error}`);
sequelize.authenticate().then(resolvedConnection).catch(rejectedConnection);
exports.default = db;
//# sourceMappingURL=index.js.map