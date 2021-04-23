import { Router } from 'express';
import { UserController } from '../controllers/user.controller';
import { useValidatorPipe } from '../middlewares/validation.pipe';

class UserRoutes extends UserController {
  public readonly router: Router;

  constructor() {
    super();
    this.router = Router();
    this.routes();
  }

  private routes = () => {
    this.router.post('/register', useValidatorPipe('REGISTER_USER'), this.registerUserAsync);
    this.router.post('/login', useValidatorPipe('login'), this.loginAsync);
  };
}
export default new UserRoutes();
