"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
const constants_1 = require("../constants/constants");
exports.default = (sequelize) => {
    const VoteModel = sequelize.define('Vote', {
        id: {
            type: sequelize_1.DataTypes.UUID,
            primaryKey: true,
            allowNull: false,
            defaultValue: sequelize_1.DataTypes.UUIDV4,
        },
        vote_by: sequelize_1.DataTypes.UUID,
        reply_id: sequelize_1.DataTypes.UUID,
        type: {
            type: sequelize_1.DataTypes.ENUM,
            values: [constants_1.VOTE_TYPE.THUMBS_DOWN, constants_1.VOTE_TYPE.THUMBS_DOWN]
        },
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
    VoteModel.associate = (models) => {
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
//# sourceMappingURL=vote.js.map