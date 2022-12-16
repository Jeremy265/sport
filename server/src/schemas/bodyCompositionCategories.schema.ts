const Joi = require('joi')

export const getByIdSchema = Joi.object({
    id: Joi.number().min(1).required()
})

export const updateSchema = Joi.object({
    body_composition_category__id: Joi.number().min(1).required(),
    title: Joi.string().required(),
    unit: Joi.string().required(),
}).required()

export const createSchema = Joi.object({
    title: Joi.string().required(),
    unit: Joi.string().required(),
}).required()