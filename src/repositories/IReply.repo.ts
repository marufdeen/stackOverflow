import { BuildOptions, Model } from 'sequelize';

export interface IReplyDTO {
  id?: string;
  ans_by: string;
  question_id: string;
  ans_body: string;
}

export interface IReplyModel extends Model<IReplyDTO>, IReplyDTO {
  associate: (model: any) => void;
}

export type IReplyRepository = typeof Model &
  IReplyModel & {
    new (values?: object, options?: BuildOptions): IReplyModel;
  };