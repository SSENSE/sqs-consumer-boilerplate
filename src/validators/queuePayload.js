import Joi from 'joi';

const schema = Joi.array().items(
    Joi.object().keys({
        // reference_id: Joi.any().required(), // eslint-disable-line newline-per-chained-call
        // destination: Joi.string().alphanum().min(2).max(50).required(), // eslint-disable-line newline-per-chained-call
        // ...
    })
);

export default schema;
