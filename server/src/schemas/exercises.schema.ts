import {Schema} from "../utils/types"
const Joi = require('joi')

export class ExercisesSchema implements Schema {

    getById = () => Joi.object({
        exercise_id: Joi.number().min(1).required()
    })

    create = () => Joi.object({
        title: Joi.string().min(2).max(100).required(),
        image: Joi.string().allow(''),
        unit_id: Joi.number().required()
    }).unknown().required()

    update = () => Joi.object({
        exercise_id: Joi.number().min(1).required(),
        title: Joi.string().min(2).max(100),
        image: Joi.string().allow(''),
        unit_id: Joi.number()
    }).unknown().required()

    remove = () => Joi.object({
        exercise_id: Joi.number().min(1).required()
    })

}















