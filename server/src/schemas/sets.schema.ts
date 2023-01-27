import {Schema} from "../utils/types"
const Joi = require('joi')

export class SetsSchema implements Schema {

    getById = () => Joi.object({
        set_id: Joi.number().min(1).required()
    })

    create = () => Joi.object({
        repetitions: Joi.number().required(),
        value: Joi.number().required(),
        exercise_id: Joi.number().required(),
        training_id: Joi.number().required()
    }).unknown().required()

    update = () => Joi.object({
        set_id: Joi.number().min(1).required(),
        repetitions: Joi.number(),
        value: Joi.number(),
        exercise_id: Joi.number(),
        training_id: Joi.number()
    }).unknown().required()

    remove = () => Joi.object({
        set_id: Joi.number().min(1).required()
    })

    getByTrainingId = () => Joi.object({
        training_id: Joi.number().min(1).required()
    })

}










