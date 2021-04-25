import 'dotenv/config';
import JWT from 'jsonwebtoken';
import { envManager } from '../config/envManager';
import { IJWTPayload } from '../repositories/IUser.repo';

const secret: string = envManager.getEnvValue('JWT_KEY');

/**
 * @author DanielAdek
 * @desc GENERATE TOKEN FOR AUTHORIZATION
 * @param {String} time THE EXPIRY TIME
 * @param {object} payload THE DATA TO BE CONTAINED IN THE TOKEN
 * @returns {String} JSON
 */
export const generateToken = (time: string, payload: IJWTPayload) =>
  `Bearer ${JWT.sign(payload, secret, { expiresIn: time })}`;

  export const pick = <T>(props: any[], obj: object): T => {
    let result: any = {};
    props.forEach((prop) =>
      Array.isArray(prop)
        ? (result[prop[1] as keyof typeof result] = obj[prop[0] as keyof typeof obj])
        : (result[prop as keyof typeof result] = obj[prop as keyof typeof obj]),
    );
    return result;
  };