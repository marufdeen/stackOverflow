import { Request, Response } from 'express';
import { Decoded } from '../repositories/IUser.repo';
import ReplyServices from '../services/replyService';

/**
 * @class ReplyController
 */
export class ReplyController extends ReplyServices {
  /**
   * @author Maruf
   * @method ansQuestionAsync
   * @desc Feature answer a question
   * @param {object} req Request object
   * @param {object} res Response object
   * @returns {object} Json data
   */
  protected ansQuestionAsync = async (req: Request, res: Response): Promise<any> => {
    const { id: ans_by } = (req as Decoded).user;
    const { question_id } = req.params;
    const data = await this.ansQuestionServiceAsync({ ...req.body, question_id, ans_by });
    return res.status(data.statusCode).json(data);
  };

  /**
   * @author Maruf
   * @method repliesForQuesAsync
   * @desc Feature fetch all replies to a question
   * @param {object} req Request object
   * @param {object} res Response object
   * @returns {object} Json data
   */
  protected repliesForQuesAsync = async (req: Request, res: Response): Promise<unknown> => {
    const { ques_id } = req.params;
    const data = await this.repliesForQuesServiceAsync(ques_id);
    return res.status(data.statusCode).json(data);
  }
}
