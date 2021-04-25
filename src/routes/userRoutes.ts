import { Router } from 'express';
import { UserController } from '../controllers/userController';
import { useValidatorPipe } from '../middlewares/validationPipe';

class UserRoutes extends UserController {
  public readonly router: Router;

  constructor() {
    super();
    this.router = Router();
    this.routes();
  }

  private routes = () => {
    this.router.post('/register', useValidatorPipe('REGISTER'), this.registerUserAsync);
    this.router.post('/login', useValidatorPipe('LOGIN'), this.loginAsync);
  };
}
export default new UserRoutes();
