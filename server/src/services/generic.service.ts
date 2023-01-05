import {handleError} from "../utils/utils";
import Joi, {ObjectSchema} from "joi";
import {Service} from "../utils/types";

// For methods that will be used in children with super().xx syntax, do not use arrow functions

export class GenericService<T> implements Service {

    protected model: any

    constructor(model: any) {
        this.model = model
    }

    validate(data: any, schema: ObjectSchema): any {
        try {
            Joi.attempt(data, schema)
        } catch (e: any) {
            throw handleError(e)
        }
    }

    get(): Promise<T[]> {
        return this.model.get()
            .then((data: T[]) => {
                return data
            })
            .catch((e: any) => {
                throw handleError(e)
            })
    }

    getById(conditions: any): Promise<T> {
        return this.model.getById(conditions)
            .then((data: T) => {
                return data
            })
            .catch((e: any) => {
                throw handleError(e)
            })
    }

    getBy(conditions: any): Promise<T> {
        return this.model.getBy(conditions)
            .then((data: T) => {
                return data
            })
            .catch((e: any) => {
                throw handleError(e)
            })
    }

    create(data: T): Promise<T | void> {
        return this.model.create(data)
            .then((data: T) => {
                return data
            })
            .catch((e: any) => {
                throw handleError(e)
            })
    }

    update(conditions: any, data: T): Promise<T | void> {
        return this.model.update(conditions, data)
            .then((data: T) => {
                return data
            })
            .catch((e: any) => {
                throw handleError(e)
            })
    }

    remove(conditions: any): Promise<T> {
        return this.model.remove(conditions)
            .then((data: T) => {
                return data
            })
            .catch((e: any) => {
                throw handleError(e)
            })
    }

}