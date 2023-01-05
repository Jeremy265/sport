const Joi = require('joi')

export const getByIdSchema = Joi.object({
    id: Joi.number().min(1).required()
})

export const createSchema = Joi.object({
    repetitions: Joi.number().required(),
    value: Joi.number().required(),
    exercise_id: Joi.number().required(),
    training_id: Joi.number().required()
}).required()

export const updateSchema = Joi.object({
    repetition_id: Joi.number().min(1).required(),
    repetitions: Joi.number().required(),
    value: Joi.number().required(),
    exercise_id: Joi.number().required(),
    training_id: Joi.number().required()
}).required()