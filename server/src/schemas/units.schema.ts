const Joi = require('joi')

export const getByIdSchema = Joi.object({
    id: Joi.number().min(1).required()
})

export const createSchema = Joi.object({
    title: Joi.string().min(1).max(100).required(),
}).required()

export const updateSchema = Joi.object({
    unit_id: Joi.number().min(1).required(),
    title: Joi.string().min(1).max(100).required(),
}).required()



    
