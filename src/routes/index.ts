import { Router } from 'express';
import UserRoutes from './user.routes';
import QuestionRoutes from './question.routes';
import ReplyRoutes from './reply.routes';
import VoteRoutes from './vote.routes';

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
