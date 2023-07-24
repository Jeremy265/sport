import {Schema} from "../utils/types"

const Joi = require('joi')

export class UsersSchema implements Schema {

    getById = () =>
        Joi.object({
            user_id: Joi.number().min(1).required()
        })

    create = () => Joi.object({
        first_name: Joi.string().min(2).max(45).required(),
        last_name: Joi.string().min(2).max(45).required(),
        email: Joi.string().min(2).max(100).required(),
        password: Joi.string().min(2).max(100).required()
    }).unknown().required()

    update = () => Joi.object({
        user_id: Joi.number().min(1).required(),
        first_name: Joi.string().min(2).max(45),
        last_name: Joi.string().min(2).max(45),
        email: Joi.string().min(2).max(100),
        password: Joi.string().min(2).max(100)
    }).unknown().required()


    remove = () => Joi.object({
        user_id: Joi.number().min(1).required()
    })

    login = () => Joi.object({
        email: Joi.string().min(2).max(100).required(),
        password: Joi.string().min(2).max(100).required()
    }).unknown().required()

}





