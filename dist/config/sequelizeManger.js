"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.sequelizeOrmManager = exports.SequelizeOrmManager = void 0;
const envManager_1 = require("./envManager");
class SequelizeOrmManager extends envManager_1.EnvManager {
    constructor() { super(process.env); }
    getSequelizeConfig() {
        const config = {
            host: this.getEnvValue('DB_HOST'),
            port: parseInt(this.getEnvValue('DB_PORT')),
            username: this.getEnvValue('DB_USERNAME'),
            password: this.getEnvValue('DB_PASSWORD'),
            database: this.getEnvValue('DB_NAME'),
            dialect: this.getEnvValue('DB_DIALECT'),
            logging: false
        };
        const prod_config = Object.create(config);
        prod_config.host = this.getEnvValue('PROD_DB_HOST');
        prod_config.username = this.getEnvValue('PROD_DB_USERNAME');
        prod_config.password = this.getEnvValue('PROD_DB_PASSWORD');
        prod_config.database = this.getEnvValue('PROD_DB_NAME');
        return {
            development: Object.assign(Object.assign({}, config), { ssl: false }),
            production: Object.assign(Object.assign(Object.assign({}, config), prod_config), { ssl: true })
        };
    }
}
exports.SequelizeOrmManager = SequelizeOrmManager;
exports.sequelizeOrmManager = new SequelizeOrmManager();
//# sourceMappingURL=sequelizeManger.js.map