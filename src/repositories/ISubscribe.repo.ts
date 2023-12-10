import { BuildOptions, Model } from 'sequelize';

export interface ISubscribeDTO {
  id?: string;
  user_id: string;
  question_id: string;
}

export interface ISubscribeModel extends Model<ISubscribeDTO>, ISubscribeDTO {
  associate: (model: any) => void;
}

export type ISubscribeRepository = typeof Model &
  ISubscribeModel & {
    new (values?: object, options?: BuildOptions): ISubscribeModel;
  };