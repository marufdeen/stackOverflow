"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
exports.default = (sequelize) => {
    const SubscribeModel = sequelize.define('Subscribe', {
        id: {
            type: sequelize_1.DataTypes.UUID,
            primaryKey: true,
            allowNull: false,
            defaultValue: sequelize_1.DataTypes.UUIDV4,
        },
        user_id: sequelize_1.DataTypes.UUID,
        question_id: sequelize_1.DataTypes.UUID,
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
    SubscribeModel.associate = (models) => {
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
//# sourceMappingURL=subscribe.js.map