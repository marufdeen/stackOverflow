import { Request, Response, NextFunction } from 'express';
import { BaseResponse, makeResponse } from '../contracts/baseResponse';
import {  Schema } from '../validation/schema';
import { HttpStatusCode } from '../constants/constants';


export const useValidatorPipe = (formType: string, source?: 'query' | 'params') => {
  return async (req: Request, res: Response, next: NextFunction): Promise<BaseResponse<null> | any> => {
    try {
      let data = req.body;
      source == 'query' && (data = req.query);
      source == 'params' && (data = req.params);
      const value = await Schema[formType].validateAsync(data, { abortEarly: false });
      req.body = value;
      next();
    } catch (error) {
      return res.status(HttpStatusCode.BAD_REQUEST).json(makeResponse(null, HttpStatusCode.BAD_REQUEST, error.message));
    }
  };
};
