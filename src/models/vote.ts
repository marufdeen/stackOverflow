import { DataTypes, Sequelize } from 'sequelize';
import { VOTE_TYPE } from '../constants/constants';
import { IVoteModel, IVoteRepository } from '../repositories/IVote.repo';

export default (sequelize: Sequelize): IVoteRepository => {
  const VoteModel = <IVoteRepository>sequelize.define('Vote', {
    id: {
      type: DataTypes.UUID,
      primaryKey: true,
      allowNull: false,
      defaultValue: DataTypes.UUIDV4,
    },
    vote_by: DataTypes.UUID,
    reply_id: DataTypes.UUID,
    type: {
      type: DataTypes.ENUM,
      values: [VOTE_TYPE.THUMBS_DOWN, VOTE_TYPE.THUMBS_DOWN]
    },
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

  VoteModel.associate = (models: IVoteModel | any) => {
    VoteModel.belongsTo(models.User, {
      foreignKey: 'user_id',
      as: 'User'
    });
    VoteModel.belongsTo(models.Question, {
      foreignKey: 'question_id'
    });
    VoteModel.hasMany(models.Vote, {
      foreignKey: 'Vote_id'
    });
  };
  return VoteModel;
};