import {SetsModel} from "../models/sets.model";
import {GenericService} from "./generic.service";
import {getByIdSchema, createSchema, updateSchema} from "../schemas/sets.schema";
import {Set} from "../utils/types";

export class SetsService extends GenericService<Set> {

    constructor() {
        super(new SetsModel());
    }

    getById = (id: number): Promise<Set> => {
        super.validate({id: id}, getByIdSchema)
        return super.getById({set_id: id})
    }

    getByTrainingId = (id: number): Promise<Set> => {
        super.validate({id: id}, getByIdSchema)
        return super.getBy({training_id: id})
    }

    create = (set: Set): Promise<Set | void> => {
        super.validate(set, createSchema)
        return super.create(set)
    }

    update = (set: Set): Promise<Set | void> => {
        super.validate(set, updateSchema)
        return super.update({set_id: set.set_id}, set)
    }

    remove = (id: number): Promise<Set> => {
        super.validate({id: id}, getByIdSchema)
        return super.remove({set_id: id})
    }

}