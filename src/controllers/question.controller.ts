import { Request, Response } from 'express';
import { Decoded } from '../repositories/IUser.repo';
import QuestionServices from '../services/question.service';

/**
 * @class QuestionController
 */
export class QuestionController extends QuestionServices {
  /**
   * @author Maruf
   * @method askQuestionAsync
   * @desc Feature ask a question
   * @param {object} req Request object
   * @param {object} res Response object
   * @returns {object} Json data
   */
  protected askQuestionAsync = async (req: Request, res: Response): Promise<any> => {
    const { id: user_id } = (req as Decoded).user;
    const data = await this.askQuestionServiceAsync({ ...req.body, user_id });
    return res.status(data.statusCode).json(data);
  };

  /**
   * @author Maruf
   * @method retrieveQuesAsync
   * @desc Feature fetch all question
   * @param {object} req Request object
   * @param {object} res Response object
   * @returns {object} Json data
   */
  protected retrieveQuesAsync = async (_req: Request, res: Response): Promise<unknown> => {
    const data = await this.retrieveQuesServiceAsync();
    return res.status(data.statusCode).json(data);
  }

  /**
   * @author Maruf
   * @method retrieveOneQuesAsync
   * @desc Feature fetch a question
   * @param {object} req Request object
   * @param {object} res Response object
   * @returns {object} Json data
   */
  protected retrieveOneQuesAsync = async (req: Request, res: Response): Promise<unknown> => {
    const { ques_id } = req.params;
    const data = await this.retrieveOneQuesServiceAsync(ques_id);
    return res.status(data.statusCode).json(data);
  }
}
