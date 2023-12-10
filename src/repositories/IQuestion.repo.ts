import { BuildOptions, Model } from 'sequelize';

export interface IQuestionDTO {
  id?: string;
  user_id: string;
  title: string;
  ques_body: string;
  viewed: number
}

export interface IQuestionModel extends Model<IQuestionDTO>, IQuestionDTO {
  associate: (model: any) => void;
}

export type IQuestionRepository = typeof Model &
  IQuestionModel & {
    new (values?: object, options?: BuildOptions): IQuestionModel;
  };