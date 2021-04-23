import { DataTypes, Sequelize } from 'sequelize';
import bcrypt from 'bcryptjs';
import { IUserModel, IUserRepository } from '../repositories/IUser.repo';

export default (sequelize: Sequelize): IUserRepository => {
  const UserModel = <IUserRepository>sequelize.define('User', {
    id: {
      type: DataTypes.UUID,
      primaryKey: true,
      allowNull: false,
      defaultValue: DataTypes.UUIDV4,
    },
    username: DataTypes.STRING,
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: {
        name: 'email',
        msg: 'Email already exist!',
      },
    },
    password: DataTypes.STRING,
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

  UserModel.associate = (models: IUserModel | any) => {
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

  UserModel.beforeSave(async (UserData: IUserModel) => {
    try {
      const saltRounds = 10;

      const encrpted = await bcrypt.hash(UserData.password, saltRounds);

      UserData.password = encrpted;
    } catch (error) {
      console.log(error);
    }
  });

  UserModel.comparePassword = async (password: string, self: IUserModel) =>
    await bcrypt.compare(password, self.password);

  return UserModel;
};
