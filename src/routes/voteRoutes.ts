import { Router } from 'express';
import { VoteController } from '../controllers/voteController';
import { useValidatorPipe } from '../middlewares/validationPipe';
import { verifyToken } from '../middlewares/jwtPipe';

class VoteRoutes extends VoteController {
  public readonly router: Router;

  constructor() {
    super();
    this.router = Router();
    this.routes();
  }

  private routes = () => {
    this.router.patch('/:reply_id', verifyToken, useValidatorPipe('VOTE_ANS'), this.voteAsync);
  };
}
export default new VoteRoutes();
