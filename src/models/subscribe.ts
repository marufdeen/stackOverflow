import { DataTypes, Sequelize } from 'sequelize';
import { ISubscribeModel, ISubscribeRepository } from '../repositories/ISubscribe.repo';

export default (sequelize: Sequelize): ISubscribeRepository => {
  const SubscribeModel = <ISubscribeRepository>sequelize.define('Subscribe', {
    id: {
      type: DataTypes.UUID,
      primaryKey: true,
      allowNull: false,
      defaultValue: DataTypes.UUIDV4,
    },
    user_id: DataTypes.UUID,
    question_id: DataTypes.UUID,
    createdAt: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: DataTypes.NOW,
    },
    updatedAt: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: DataTypes.NOW,
    },
  });

  SubscribeModel.associate = (models: ISubscribeModel | any) => {
    SubscribeModel.belongsTo(models.User, {
      foreignKey: 'user_id',
      as: 'User'
    });
    SubscribeModel.belongsTo(models.Question, {
      foreignKey: 'question_id'
    });
  };
  return SubscribeModel;
};