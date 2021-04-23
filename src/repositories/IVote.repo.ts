import { BuildOptions, Model } from 'sequelize';
import { VOTE_TYPE } from '../constants/constants';

export interface IVoteDTO {
  id?: string;
  vote_by: string;
  reply_id: string;
  type: VOTE_TYPE;
}

export interface IVoteModel extends Model<IVoteDTO>, IVoteDTO {
  associate: (model: any) => void;
}

export type IVoteRepository = typeof Model &
  IVoteModel & {
    new (values?: object, options?: BuildOptions): IVoteModel;
  };