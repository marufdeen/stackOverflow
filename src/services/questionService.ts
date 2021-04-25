import db from '../models/index';
import { BaseResponse, makeResponse } from '../contracts/baseResponse';
import { HttpStatusCode } from '../constants/constants';
import { IQuestionRepository, IQuestionDTO, IQuestionModel } from '../repositories/IQuestion.repo';

const Question: IQuestionRepository = db.Question;

/**
 * @class QuestionServices
 */
export default class QuestionServices implements Required<QuestionServices> {
  /**
   * @author Maruf
   * @method askQuestionServiceAsync
   * @desc Feature will post a Question
   * @returns {object} Json data
   */
   askQuestionServiceAsync = async (ques_dto: IQuestionDTO): Promise<BaseResponse<IQuestionDTO | null>> => {
    try {
      const question = <IQuestionModel>await Question.findOne({
        where: { title: ques_dto.title },
      });
      if (question) {
        return makeResponse(null, HttpStatusCode.CONFLICT, 'This question already exist');
      }
      const new_ques = await Question.create(ques_dto);
      return makeResponse(new_ques);
    } catch (error) {
      return makeResponse(null, HttpStatusCode.INTERNAL_ERROR, error.message);
    }
  };

  /**
   * @author Maruf
   * @method retrieveQuesServiceAsync
   * @desc Feature register and authenticate a Question
   * @returns {object} Json data
   */
  protected retrieveQuesServiceAsync = async (): Promise<BaseResponse<IQuestionDTO[] | null>> => {
    try {
      const questions_data = <IQuestionDTO[]>await Question.findAll();

      return makeResponse(questions_data);
    } catch (error) {
      return makeResponse(null, HttpStatusCode.INTERNAL_ERROR, error.message);
    }
  }

  /**
   * @author Maruf
   * @method retrieveQuesServiceAsync
   * @desc Feature register and authenticate a Question
   * @returns {object} Json data
   */
  protected retrieveOneQuesServiceAsync = async (ques_id: string): Promise<BaseResponse<IQuestionDTO | null>> => {
    try {
      const question_data = <IQuestionDTO>await Question.findOne({ where: { id: ques_id }});
      if (!question_data)
        return makeResponse(question_data, HttpStatusCode.NOT_FOUND, 'Question not found')
      return makeResponse(question_data);
    } catch (error) {
      return makeResponse(null, HttpStatusCode.INTERNAL_ERROR, error.message);
    }
  }
}
