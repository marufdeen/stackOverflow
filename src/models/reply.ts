import { DataTypes, Sequelize } from 'sequelize';
import { IReplyModel, IReplyRepository } from '../repositories/IReply.repo';

export default (sequelize: Sequelize): IReplyRepository => {
  const ReplyModel = <IReplyRepository>sequelize.define('Reply', {
    id: {
      type: DataTypes.UUID,
      primaryKey: true,
      allowNull: false,
      defaultValue: DataTypes.UUIDV4,
    },
    ans_by: DataTypes.UUID,
    question_id: DataTypes.UUID,
    ans_body: DataTypes.TEXT,
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

  ReplyModel.associate = (models: IReplyModel | any) => {
    ReplyModel.belongsTo(models.User, {
      foreignKey: 'user_id',
      as: 'User'
    });
    ReplyModel.belongsTo(models.Question, {
      foreignKey: 'question_id'
    });
    ReplyModel.hasMany(models.Vote, {
      foreignKey: 'reply_id'
    });
  };
  return ReplyModel;
};