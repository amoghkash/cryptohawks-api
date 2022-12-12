const Joi = require('joi');

function validateSignupInput(user) {
    const schema = Joi.object({
        name: Joi.string().max(50).required(),
        username: Joi.string().max(255).alphanum().required(),
        password: Joi.string().max(255).alphanum().required(),
        subteam: Joi.required(),
        grade: Joi.required(),
        admin: Joi.required()
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

function validateTaskCreation(task) {
    const schema = Joi.object({
        title: Joi.string().required(),
        description: Joi.string().required(),
        assignee: Joi.string(),
        startDate: Joi.date(),
        endDate: Joi.date(),
        type: Joi.string().required()
    });
    return schema.validate(task);
}

module.exports = { validateSignupInput, validateLoginInput, validateTaskCreation};