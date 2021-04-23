"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const fileWriter = require("fs");
const path = require("path");
const sequelizeManger_1 = require("../config/sequelizeManger");
class FileWriter {
    static writeSequelizeJSONFile() {
        fileWriter.writeFileSync(path.resolve(__dirname + '/../sequelize.json'), JSON.stringify(sequelizeManger_1.sequelizeOrmManager.getSequelizeConfig(), null, 2));
    }
}
FileWriter.writeSequelizeJSONFile();
//# sourceMappingURL=write-sequelize-config.js.map