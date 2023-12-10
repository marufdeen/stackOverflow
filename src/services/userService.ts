import db from '../models/index';
import { BaseResponse, makeResponse } from '../contracts/baseResponse';
import { HttpStatusCode, USER_TOKEN_EXPIRE_TIME } from '../constants/constants';
import { IUserRepository, ILoginDTO, IUserDTO, IUserModel } from '../repositories/IUser.repo';
import { generateToken, pick } from '../helpers/indexHelpers';

const User: IUserRepository = db.User;

/**
 * @class UserServices
 */
export default class UserServices implements Required<UserServices> {

  /**
   * @author Maruf
   * @method registerUserServiceAsync
   * @desc Feature register and authenticate a user
   * @returns {object} Json data
   */
  protected registerUserServiceAsync = async (registerDTO: IUserDTO): Promise<BaseResponse<IUserDTO | null>> => {
    try {
      const user_data = <IUserDTO>await User.findOne({ where: { email: registerDTO.email } });

      if (user_data) {
        return makeResponse(null, HttpStatusCode.CONFLICT, 'Email already exist');
      }

      const new_user_data = <IUserModel> await User.create(registerDTO);

      new_user_data.dataValues.token = generateToken(USER_TOKEN_EXPIRE_TIME, {
        id: new_user_data.id!
      });;
      const user_keys = [["id", "userId"], "email", "username", "token", "createdAt", "updatedAt"];
 
      return makeResponse({
        ...pick(user_keys,  new_user_data.dataValues)
      } as IUserDTO,  HttpStatusCode.CREATED); 
    } catch (error) {
      return makeResponse(null, HttpStatusCode.INTERNAL_ERROR, error.message);
    }
  }
  /**
   * @author Maruf
   * @method loginUserServiceAsync
   * @desc Feature authenticate a user
   * @returns {object} Json data
   */
  loginUserServiceAsync = async (loginDTO: ILoginDTO): Promise<BaseResponse<IUserDTO | null>> => {
    try {
      const user = <IUserModel>await User.findOne({
        where: { email: loginDTO.email },
      });

      if (!user) {
        return makeResponse(null, HttpStatusCode.UNAUTHORIZED, 'Email or Password is not correct');
      }

      const passwordMatch = await User.comparePassword(loginDTO.password, user);

      if (!passwordMatch) {
        return makeResponse(null, HttpStatusCode.UNAUTHORIZED, 'Email or Password is incorrect');
      }

      user.dataValues.token = generateToken(USER_TOKEN_EXPIRE_TIME, {
        id: user.id!
      });

      const user_keys = [["id", "userId"], "email", "username", "token", "createdAt", "updatedAt"];
 
      return makeResponse({
        ...pick(user_keys, user.dataValues)
      } as IUserDTO);

    } catch (error) {
      return makeResponse(null, HttpStatusCode.INTERNAL_ERROR, error.message);
    }
  };
}
