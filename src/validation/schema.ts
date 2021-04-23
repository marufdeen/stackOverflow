import Joi from 'joi';
import { VOTE_TYPE } from '../constants/constants';

/**
 * @author Maruf
 * @desc REQUEST SCHEMA VALIDATOR
 */
export const Schema: { [key: string]: Joi.ObjectSchema<any> } = {
  event: Joi.object({}),
  REGISTER_USER: Joi.object({
    email: Joi.string().email({ minDomainSegments: 2 }),
    username: Joi.string().alphanum().min(3).max(30).required(),
    password: Joi.string().min(8).max(15).pattern(new RegExp('^[a-zA-Z0-9]{3,30}$')),
  }).required(),
  login: Joi.object({
    email: Joi.string().email({ minDomainSegments: 2 }),
    password: Joi.string().pattern(new RegExp('^[a-zA-Z0-9]{3,30}$')),
  }).required(),
  ASK_QUES: Joi.object({
    title: Joi.string().required(),
    ques_body: Joi.string().required()
  }).required(),
  VOTE_ANS: Joi.object({
    type: Joi.string()
    .valid(...Object.values(VOTE_TYPE))
    .required()
  }).required(),
  ANSWER_QUES: Joi.object({
    ans_body: Joi.string().required()
  }).required(),
};