import { DataTypes, Sequelize } from 'sequelize';
import { IQuestionModel, IQuestionRepository } from '../repositories/IQuestion.repo';

export default (sequelize: Sequelize): IQuestionRepository => {
  const QuestionModel = <IQuestionRepository>sequelize.define('Question', {
    id: {
      type: DataTypes.UUID,
      primaryKey: true,
      allowNull: false,
      defaultValue: DataTypes.UUIDV4,
    },
    user_id: DataTypes.UUID,
    title: DataTypes.STRING,
    ques_body: DataTypes.TEXT,
    viewed: DataTypes.INTEGER,
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

  QuestionModel.associate = (models: IQuestionModel | any) => {
    QuestionModel.belongsTo(models.User, {
      foreignKey: 'user_id'
    });
    QuestionModel.hasMany(models.Reply, {
      foreignKey: 'question_id'
    });
    QuestionModel.hasMany(models.Subscribe, {
      foreignKey: 'question_id'
    });
  };
  return QuestionModel;
};
