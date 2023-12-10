import 'dotenv/config';
import fs from 'fs';
import path from 'path';
import { Sequelize } from 'sequelize';

import { envManager } from '../config/envManager';
import configPath from '../sequelize.json';

const mode = <'development' | 'production'>envManager.getEnvValue('APP_ENV');

const config = configPath[mode];

const sequelize = new Sequelize(config.database, config.username, config.password, {
  ...config,
  dialect: 'mysql'
});

const db: any = {};
const basename = path.basename(module.filename);

fs.readdirSync(__dirname)
  .filter((file) => {
    return file.indexOf('.') !== 0 && file !== basename && file.slice(-3) === '.js';
  })
  .forEach((file) => {
    const model = sequelize.import(path.join(__dirname, file));
    db[model.name] = model;
  });

Object.keys(db).forEach((modelName) => {
  if (db[modelName].associate) {
    db[modelName].associate(db);
  }
});

db.sequelize = sequelize;
db.Sequelize = Sequelize;

const resolvedConnection = () => console.info('Connected to database!');

const rejectedConnection = (error: any) => console.info(`Failed to connect. Error: ${error}`);

sequelize.authenticate().then(resolvedConnection).catch(rejectedConnection);

export default db;
