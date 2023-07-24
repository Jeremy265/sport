import {handleError} from "../utils/utils"
import {ObjectSchema} from "joi"
import {Condition, Service} from "../utils/types"

const Joi = require('joi')

// For methods that will be used in children with super().xx syntax, do not use arrow functions

export class GenericService<T> implements Service {

    protected model: any
    protected schema: any
    protected idField: string

    constructor(model: any, schema: any, idField: string) {
        this.model = model
        this.schema = schema
        this.idField = idField
    }

    validateSchema(data: any, schema: ObjectSchema): any {
        try {
            Joi.attempt(data, schema)
        } catch (e: any) {
            throw handleError(e)
        }
    }

    get(conditions: Condition): Promise<T[]> {
        return this.model.get(conditions)
            .then((data: T[]) => {
                return data
            })
            .catch((e: any) => {
                throw handleError(e)
            })
    }

    getById(conditions: Condition, id: any): Promise<T> {
        this.validateSchema({[this.idField]: id}, this.schema.getById())
        return this.model.getById({
            ...conditions,
            [this.idField]: id
        }).then((data: T) => {
            return data
        }).catch((e: any) => {
            throw handleError(e)
        })
    }

    getBy(conditions: any): Promise<T[]> {
        return this.model.getBy(conditions)
            .then((data: T[]) => {
                return data
            })
            .catch((e: any) => {
                throw handleError(e)
            })
    }

    create(data: T): Promise<T | void> {
        this.validateSchema(data, this.schema.create())
        return this.model.create(data)
            .then((data: T) => {
                return data
            })
            .catch((e: any) => {
                throw handleError(e)
            })
    }

    updateById(id: any, data: T): Promise<T | void> {
        this.validateSchema({[this.idField]: id}, this.schema.update())
        return this.model.update({[this.idField]: id}, data)
            .then((data: T) => {
                return data
            })
            .catch((e: any) => {
                throw handleError(e)
            })
    }

    removeById(id: any): Promise<T> {
        this.validateSchema({[this.idField]: id}, this.schema.remove())
        return this.model.remove({[this.idField]: id})
            .then((data: T) => {
                return data
            })
            .catch((e: any) => {
                throw handleError(e)
            })
    }

}
