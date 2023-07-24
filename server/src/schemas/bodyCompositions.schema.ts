import {Schema} from "../utils/types"
const Joi = require('joi')

export class BodyCompositionsSchema implements Schema {

    getById = () => Joi.object({
        body_composition_id: Joi.number().min(1).required()
    })

    create = () => Joi.object({
        date: Joi.date(),
        value: Joi.number().max(999).required(),
        user_id: Joi.number().required(),
        body_composition_category_id: Joi.number().required()
    }).unknown().required()

    update = () => Joi.object({
        body_composition_id: Joi.number().min(1).required(),
        date: Joi.date().max(999),
        value: Joi.number(),
        user_id: Joi.number(),
        body_composition_category_id: Joi.number()
    }).unknown().required()

    remove = () => Joi.object({
        body_composition_id: Joi.number().min(1).required()
    })

    getByUserId = () => Joi.object({
        user_id: Joi.number().min(1).required()
    })

}















