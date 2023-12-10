import { Router } from 'express';
import UserRoutes from './userRoutes';
import QuestionRoutes from './questionRoutes';
import ReplyRoutes from './replyRoutes';
import VoteRoutes from './voteRoutes';

class Routes {
  public readonly router: Router;

  constructor() {
    this.router = Router();
    this.applicationRoutes();
  }

  private applicationRoutes = (): void => {
    this.router.use('/users', UserRoutes.router);
    this.router.use('/questions', QuestionRoutes.router);
    this.router.use('/replies', ReplyRoutes.router);
    this.router.use('/votes', VoteRoutes.router);
  };
}

export default new Routes();
