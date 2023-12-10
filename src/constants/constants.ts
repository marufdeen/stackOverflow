import { envManager } from '../config/envManager';

// Http status code
export enum HttpStatusCode {
  OK = 200,
  CREATED = 201,
  NO_CONTENT = 204,
  NOT_MODIFIED = 304,
  BAD_REQUEST = 400,
  UNAUTHORIZED = 401,
  PAYMENT_REQUIRED = 402,
  FORBIDEN = 403,
  NOT_FOUND = 404,
  CONFLICT = 409,
  VALIDATION_ERROR = 422,
  NOT_PROCCESSED = 422,
  INTERNAL_ERROR = 500,
}

export enum VOTE_TYPE {
  THUMBS_UP = 'THUMBS_UP',
  THUMBS_DOWN = 'THUMBS_DOWN'
}

// token expires in 1h
export const USER_TOKEN_EXPIRE_TIME = envManager.getEnvValue('TOKEN_EXPIRE');