import { Request, Response } from 'express';
import { Decoded } from '../repositories/IUser.repo';
import VoteServices from '../services/voteService';

/**
 * @class VoteController
 */
export class VoteController extends VoteServices {
  /**
   * @author Maruf
   * @method voteAsync
   * @desc Feature will vote up or down a reply
   * @param {object} req Request object
   * @param {object} res Response object
   * @returns {object} Json data
   */
  protected voteAsync = async (req: Request, res: Response): Promise<any> => {
    const { reply_id } = req.params;
    const { id: vote_by } = (req as Decoded).user;
    const data = await this.voteServiceAsync({ ...req.body, reply_id, vote_by });
    return res.status(data.statusCode).json(data);
  };
}
