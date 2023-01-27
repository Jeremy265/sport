
import {Schema} from "../utils/types"
const Joi = require('joi')

export class BodyCompositionCategoriesSchema implements Schema {

    getById = () => Joi.object({
        body_composition_category_id: Joi.number().min(1).required()
    })

    create = () => Joi.object({
        title: Joi.string().required(),
        unit_id: Joi.number().required(),
    }).unknown().required()

    update = () => Joi.object({
        body_composition_category_id: Joi.number().min(1).required(),
        title: Joi.string(),
        unit_id: Joi.number(),
    }).unknown().required()

    remove = () => Joi.object({
        body_composition_category_id: Joi.number().min(1).required()
    })

}















