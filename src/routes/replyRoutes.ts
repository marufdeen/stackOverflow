import { Router } from 'express';
import { ReplyController } from '../controllers/replyController';
import { useValidatorPipe } from '../middlewares/validationPipe';
import { verifyToken } from '../middlewares/jwtPipe';

class ReplyRoutes extends ReplyController {
  public readonly router: Router;

  constructor() {
    super();
    this.router = Router();
    this.routes();
  }

  private routes = () => {
    this.router.route('/:question_id')
    .post(verifyToken, useValidatorPipe('ANSWER_QUES'), this.ansQuestionAsync)
    .get(verifyToken, this.repliesForQuesAsync);
  };
}
export default new ReplyRoutes();
