const Joi = require('joi')

export const getByIdSchema = Joi.object({
    id: Joi.number().min(1).required()
})

export const updateSchema = Joi.object({
    body_composition_id: Joi.number().min(1).required(),
    date: Joi.date().required(),
    value: Joi.number().required(),
    user_id: Joi.number().required(),
    body_composition_category_id: Joi.number().required()
}).required()

export const createSchema = Joi.object({
    date: Joi.date().required(),
    value: Joi.number().required(),
    user_id: Joi.number().required(),
    body_composition_category_id: Joi.number().required()
}).required()