import db from '../models/index';
import { BaseResponse, makeResponse } from '../contracts/baseResponse';
import { HttpStatusCode } from '../constants/constants';
import { IReplyRepository, IReplyDTO, IReplyModel } from '../repositories/IReply.repo';

const Reply: IReplyRepository = db.Reply;

/**
 * @class ReplyServices
 */
export default class ReplyServices implements Required<ReplyServices> {
  /**
   * @author Maruf
   * @method ansQuestionServiceAsync
   * @desc Feature will post a reply to a question
   * @returns {object} Json data
   */
   ansQuestionServiceAsync = async (ans_dto: IReplyDTO): Promise<BaseResponse<IReplyDTO | null>> => {
    try {
      const { ans_by, ans_body, question_id } = ans_dto;

      const reply = <IReplyModel>await Reply.findOne({
        where: { ans_by: ans_by, question_id, ans_body },
      });

      if (reply) {
        return makeResponse(null, HttpStatusCode.CONFLICT, 'This answer already exist');
      }
      const new_reply = await Reply.create(ans_dto);

      // todo: send notification to subscribed users

      return makeResponse(new_reply);
    } catch (error) {
      return makeResponse(null, HttpStatusCode.INTERNAL_ERROR, error.message);
    }
  };

  /**
   * @author Maruf
   * @method repliesForQuesServiceAsync
   * @desc Feature fetch all answers to a question
   * @returns {object} Json data
   */
  protected repliesForQuesServiceAsync = async (ques_id: string): Promise<BaseResponse<IReplyDTO[] | null>> => {
    try {
      const reply_data = <IReplyDTO[]>await Reply.findAll({ where: { question_id: ques_id }});

      return makeResponse(reply_data);
    } catch (error) {
      return makeResponse(null, HttpStatusCode.INTERNAL_ERROR, error.message);
    }
  }
}
