
import {Schema} from "../utils/types"
const Joi = require('joi')

export class BodyCompositionCategoryVisibilitiesSchema implements Schema {

    getById = () => Joi.object({
        body_composition_category_id: Joi.number().min(1).required()
    })

    create = () => Joi.object({
        body_composition_category_id: Joi.number().min(1).required(),
        user_id: Joi.number().min(1).required(),
        visible: Joi.boolean().required()
    }).unknown().required()

    update = () => Joi.object({
        body_composition_category_id: Joi.number().min(1).required(),
        user_id: Joi.number().min(1).required(),
        visible: Joi.boolean().required()
    }).unknown().required()

    remove = () => Joi.object({
        body_composition_category_id: Joi.number().min(1).required()
    })

    updateVisibilities = () => Joi.array().items({
        body_composition_category_id: Joi.number().min(1).required(),
        visible: Joi.boolean().required()
    })

}















