const Joi = require('joi');

function validateSignupInput(user) {
    const schema = Joi.object({
        name: Joi.string().max(50).required(),
        username: Joi.string().max(255).required(),
        password: Joi.string().max(255).required(),
        subteam: Joi.array().required()
    });
    return schema.validate(user);
}

function validateLoginInput(user) {
    const schema = Joi.object({
        username: Joi.string().max(255).required(),
        password: Joi.string().required()
    });
    return schema.validate(user);
}

module.exports = { validateSignupInput, validateLoginInput };