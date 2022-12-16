const Joi = require('joi')

export const getByIdSchema = Joi.object({
    id: Joi.number().min(1).required()
})

export const updateSchema = Joi.object({
    user_id: Joi.number().min(1).required(),
    first_name: Joi.string().min(2).max(45).required(),
    last_name: Joi.string().min(2).max(45).required(),
    email: Joi.string().min(2).max(100).required(),
    password: Joi.string().min(2).max(100).required()
}).required()

export const createSchema = Joi.object({
    first_name: Joi.string().min(2).max(45).required(),
    last_name: Joi.string().min(2).max(45).required(),
    email: Joi.string().min(2).max(100).required(),
    password: Joi.string().min(2).max(100).required()
}).required()

export const loginSchema = Joi.object({
    email: Joi.string().min(2).max(100).required(),
    password: Joi.string().min(2).max(100).required()
}).required()



