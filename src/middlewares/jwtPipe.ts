import { Request, Response, NextFunction } from 'express';
import { config } from 'dotenv';
import * as JWT from 'jsonwebtoken';
import { Decoded } from '../repositories/IUser.repo';
import { HttpStatusCode } from '../constants/constants';
import { IUserModel, IUserRepository } from '../repositories/IUser.repo';
import { makeResponse } from '../contracts/baseResponse';
import { envManager } from '../config/envManager';
import db from '../models/index';

const User: IUserRepository = db.User;

config();

const secret: string = envManager.getEnvValue('JWT_KEY');

export const verifyToken = (req: Request, res: Response, next: NextFunction): any => {
  try {
    let tokenBearer: string = req.headers.authorization!;

    if (!tokenBearer)
      return res
        .status(HttpStatusCode.FORBIDEN)
        .json(makeResponse(null, HttpStatusCode.FORBIDEN, 'Client key is required'));

    const token: string = tokenBearer.split(' ')[1];

    JWT.verify(
      token,
      secret,
      async (err, decoded: any): Promise<any> => {
        if ((err && err.name) === 'TokenExpiredError') {
          return res
            .status(HttpStatusCode.FORBIDEN)
            .json(makeResponse(null, HttpStatusCode.FORBIDEN, 'Client key is expired'));
        }

        if (err)
          return res
            .status(HttpStatusCode.FORBIDEN)
            .json(makeResponse(null, HttpStatusCode.FORBIDEN, 'Client key is invalid'));

        const user = (await User.findOne({ where: { id: decoded.id } })) as IUserModel;

        if (!user) {
          return res
            .status(HttpStatusCode.FORBIDEN)
            .json(makeResponse(null, HttpStatusCode.FORBIDEN, 'Access rejected'));
        }

        (req as Decoded).user = user;
        next();
      },
    );
  } catch (error) {
    return res
      .status(HttpStatusCode.INTERNAL_ERROR)
      .json(makeResponse(null, HttpStatusCode.INTERNAL_ERROR, error.message));
  }
};
