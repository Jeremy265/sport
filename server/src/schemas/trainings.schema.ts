import {Schema} from "../utils/types"
const Joi = require('joi')

export class TrainingsSchema implements Schema {

    getById = () => Joi.object({
        training_id: Joi.number().min(1).required()
    })

    create = () => Joi.object({
        title: Joi.string(),
        date: Joi.date(),
        user_id: Joi.number().required()
    }).unknown().required()

    update = () => Joi.object({
        training_id: Joi.number().min(1).required(),
        title: Joi.string().min(2).max(100),
        date: Joi.date()
    }).unknown().required()

    remove = () => Joi.object({
        training_id: Joi.number().min(1).required()
    })

}










