"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
exports.default = (sequelize) => {
    const ReplyModel = sequelize.define('Reply', {
        id: {
            type: sequelize_1.DataTypes.UUID,
            primaryKey: true,
            allowNull: false,
            defaultValue: sequelize_1.DataTypes.UUIDV4,
        },
        ans_by: sequelize_1.DataTypes.UUID,
        question_id: sequelize_1.DataTypes.UUID,
        ans_body: sequelize_1.DataTypes.TEXT,
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
    ReplyModel.associate = (models) => {
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
//# sourceMappingURL=reply.js.map