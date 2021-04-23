import { Request, Response } from 'express';
import UserServices from '../services/user.service';

/**
 * @class UserController
 */
export class UserController extends UserServices {
  /**
   * @author Maruf
   * @method registerUserAsync
   * @desc Feature signs up the user
   * @param {object} req Request object
   * @param {object} res Response object
   * @returns {object} Json data
   */
  protected registerUserAsync = async (req: Request, res: Response): Promise<unknown> => {
    const data = await this.registerUserServiceAsync(req.body);
    return res.status(data.statusCode).json(data);
  }
  
  /**
   * @author Maruf
   * @method loginAsync
   * @desc Feature authenticate a user
   * @param {object} req Request object
   * @param {object} res Response object
   * @returns {object} Json data
   */
  protected loginAsync = async (req: Request, res: Response): Promise<any> => {
    const data = await this.loginUserServiceAsync(req.body);
    return res.status(data.statusCode).json(data);
  };
}
