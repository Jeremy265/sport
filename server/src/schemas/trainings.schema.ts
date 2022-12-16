const Joi = require('joi')

export const getByIdSchema = Joi.object({
    id: Joi.number().min(1).required()
})

export const createSchema = Joi.object({
    title: Joi.string(),
    date: Joi.date().required(),
    user_id: Joi.number().required()
}).required()

export const updateSchema = Joi.object({
    training_id: Joi.number().min(1).required(),
    title: Joi.string().min(2).max(100).required(),
    image: Joi.string()
}).required()



    
