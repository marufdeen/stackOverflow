import { Router } from 'express';
import { QuestionController } from '../controllers/question.controller';
import { useValidatorPipe } from '../middlewares/validation.pipe';
import { verifyToken } from '../middlewares/jwt.pipe';

class QuestionRoutes extends QuestionController {
  public readonly router: Router;

  constructor() {
    super();
    this.router = Router();
    this.routes();
  }

  private routes = () => {
    this.router.route('/')
    .post(verifyToken, useValidatorPipe('ASK_QUES'), this.askQuestionAsync)
    .get(verifyToken, this.retrieveQuesAsync);
    this.router.get('/:ques_id', verifyToken, this.retrieveOneQuesAsync)
  };
}
export default new QuestionRoutes();
