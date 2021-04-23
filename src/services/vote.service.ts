import db from '../models/index';
import { BaseResponse, makeResponse } from '../contracts/baseResponse';
import { HttpStatusCode } from '../constants/constants';
import { IVoteRepository, IVoteDTO } from '../repositories/IVote.repo';
import { IUserRepository } from '../repositories/IUser.repo';
import { IReplyRepository } from 'src/repositories/IReply.repo';

const Vote: IVoteRepository = db.Vote;
const User: IUserRepository = db.User;
const Reply: IReplyRepository = db.Reply;

/**
 * @class VoteServices
 */
export default class VoteServices implements Required<VoteServices> {
  /**
   * @author Maruf
   * @method protected voteServiceAsync
   * @desc Feature will post a vote to an answer
   * @returns {object} Json data
   */
  protected voteServiceAsync = async (vote_dto: IVoteDTO): Promise<BaseResponse<IVoteDTO | null>> => {
    try {
      const { vote_by, reply_id, type } = vote_dto;

      const [user, reply, vote] = await Promise.all([
        User.findOne({
          where: { id: vote_by },
        }),
        Reply.findOne({ where: {id: reply_id }}),
        Vote.findOne({ where: { vote_by, reply_id }})
      ]);

      if (!user) {
        return makeResponse(null, HttpStatusCode.NOT_FOUND, 'User not found');
      }

      if (!reply) {
        return makeResponse(null, HttpStatusCode.NOT_FOUND, 'Answer/Reply not found');
      }

      if (!vote) {
        const new_vote = await Vote.create(vote_dto);
        return makeResponse(new_vote)
      }

      vote.type = type;

      await vote.save();

      return makeResponse(vote);
    } catch (error) {
      return makeResponse(null, HttpStatusCode.INTERNAL_ERROR, error.message);
    }
  };
}
