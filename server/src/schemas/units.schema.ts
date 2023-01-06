import {Schema} from "../utils/types";
const Joi = require('joi')

export class UnitsSchema implements Schema {

    getById = () => Joi.object({
        unit_id: Joi.number().min(1).required()
    })

    create = () => Joi.object({
        title: Joi.string().min(1).max(100).required(),
        isDefault: Joi.boolean()
    }).unknown().required()

    update = () => Joi.object({
        unit_id: Joi.number().min(1).required(),
        title: Joi.string().min(1).max(100),
        isDefault: Joi.boolean()
    }).unknown().required()
    
    remove = () => Joi.object({
        unit_id: Joi.number().min(1).required()
    }).unknown().required()

}






    
