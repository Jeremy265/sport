import {empty} from "@prisma/client/runtime";

const Joi = require('joi')

export const getByIdSchema = Joi.object({
    id: Joi.number().min(1).required()
})

export const createSchema = Joi.object({
    title: Joi.string().min(2).max(100).required(),
    image: Joi.string().allow(''),
    unit_id: Joi.number().required()
}).required()

export const updateSchema = Joi.object({
    exercise_id: Joi.number().min(1).required(),
    title: Joi.string().min(2).max(100).required(),
    image: Joi.string().allow(''),
    unit_id: Joi.number().required()
}).required()



    
