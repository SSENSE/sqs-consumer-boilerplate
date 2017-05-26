// @flow
import Joi from 'joi';
import queuePayload from './queuePayload';

export default function validate(...args: any): Joi.ValidationResult<any> {
    return Joi.validate(...args);
}

export { queuePayload };
