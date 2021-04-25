import fileWriter = require('fs');
import path = require('path');
import { sequelizeOrmManager } from '../config/sequelizeManager';


class FileWriter {

  public static writeSequelizeJSONFile() {
    fileWriter.writeFileSync(
      path.resolve(__dirname + '/../sequelize.json'),
      JSON.stringify(sequelizeOrmManager.getSequelizeConfig(), null, 2)
    );
  }
}

FileWriter.writeSequelizeJSONFile();