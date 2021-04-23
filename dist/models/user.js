"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
const bcryptjs_1 = __importDefault(require("bcryptjs"));
exports.default = (sequelize) => {
    const UserModel = sequelize.define('User', {
        id: {
            type: sequelize_1.DataTypes.UUID,
            primaryKey: true,
            allowNull: false,
            defaultValue: sequelize_1.DataTypes.UUIDV4,
        },
        username: sequelize_1.DataTypes.STRING,
        email: {
            type: sequelize_1.DataTypes.STRING,
            allowNull: false,
            unique: {
                name: 'email',
                msg: 'Email already exist!',
            },
        },
        password: sequelize_1.DataTypes.STRING,
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
    UserModel.associate = (models) => {
        UserModel.hasMany(models.Question, {
            foreignKey: 'user_id'
        });
        UserModel.hasMany(models.Reply, {
            foreignKey: 'ans_by',
            as: 'User',
        });
        UserModel.hasMany(models.Vote, {
            foreignKey: 'vote_by',
            as: 'Voter',
        });
        UserModel.hasMany(models.Subscribe, {
            foreignKey: 'user_id',
            as: 'Subscriber',
        });
    };
    UserModel.beforeSave((UserData) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const saltRounds = 10;
            const encrpted = yield bcryptjs_1.default.hash(UserData.password, saltRounds);
            UserData.password = encrpted;
        }
        catch (error) {
            console.log(error);
        }
    }));
    UserModel.comparePassword = (password, self) => __awaiter(void 0, void 0, void 0, function* () { return yield bcryptjs_1.default.compare(password, self.password); });
    return UserModel;
};
//# sourceMappingURL=user.js.map