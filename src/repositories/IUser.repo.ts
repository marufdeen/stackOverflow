import { Request } from 'express';
import { BuildOptions, Model } from 'sequelize';

export interface IJWTPayload {
  id: string;
}

export interface Decoded extends Request, IJWTPayload {
  user: IUserModel
}

export interface ILoginDTO {
  email: string;
  password: string;
}

export interface IUserDTO extends ILoginDTO {
  id?: string;
  username: string,
  token?: string;
}

export interface IUserModel extends Model<IUserDTO>, IUserDTO {
  comparePassword: (password: string, Customer: IUserModel) => Promise<boolean>;
  associate: (model: any) => void;
  dataValues: IUserDTO
}

export type IUserRepository = typeof Model &
  IUserModel & {
    new (values?: object, options?: BuildOptions): IUserModel;
  };