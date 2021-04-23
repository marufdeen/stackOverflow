import { Router } from 'express';
import { VoteController } from '../controllers/vote.controller';
import { useValidatorPipe } from '../middlewares/validation.pipe';
import { verifyToken } from '../middlewares/jwt.pipe';

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
