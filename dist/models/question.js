"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
exports.default = (sequelize) => {
    const QuestionModel = sequelize.define('Question', {
        id: {
            type: sequelize_1.DataTypes.UUID,
            primaryKey: true,
            allowNull: false,
            defaultValue: sequelize_1.DataTypes.UUIDV4,
        },
        user_id: sequelize_1.DataTypes.UUID,
        title: sequelize_1.DataTypes.STRING,
        ques_body: sequelize_1.DataTypes.TEXT,
        viewed: sequelize_1.DataTypes.INTEGER,
        createdAt: {
            type: sequelize_1.DataTypes.DATE,
            allowNull: false,
            defaultValue: sequelize_1.DataTypes.NOW,
        },
        updatedAt: {
            type: sequelize_1.DataTypes.DATE,
            allowNull: false,
            defaultValue: sequelize_1.DataTypes.NOW,
        },
    });
    QuestionModel.associate = (models) => {
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
//# sourceMappingURL=question.js.map