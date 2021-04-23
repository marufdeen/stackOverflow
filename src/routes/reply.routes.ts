import { Router } from 'express';
import { ReplyController } from '../controllers/reply.controller';
import { useValidatorPipe } from '../middlewares/validation.pipe';
import { verifyToken } from '../middlewares/jwt.pipe';

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
