import {GenericService} from "./generic.service";
import {createSchema, getByIdSchema, updateSchema} from "../schemas/bodyCompositions.schema";
import {BodyComposition} from "../utils/types";
import {BodyCompositionsModel} from "../models/bodyCompositions.model";

export class BodyCompositionsService extends GenericService<BodyComposition> {

    constructor() {
        super(new BodyCompositionsModel());
    }

    getById = (id: number): Promise<BodyComposition> => {
        super.validate({id: id}, getByIdSchema)
        return super.getById({body_composition_id: id})
    }

    getByUserId = (id: number): Promise<BodyComposition> => {
        super.validate({id: id}, getByIdSchema)
        return super.getBy({user_id: id})
    }

    create = (body_composition: BodyComposition): Promise<BodyComposition | void> => {
        super.validate(body_composition, createSchema)
        return super.create(body_composition)
    }

    update = (body_composition: BodyComposition): Promise<BodyComposition | void> => {
        super.validate(body_composition, updateSchema)
        return super.update({body_composition_id: body_composition.body_composition_id}, body_composition)
    }

    remove = (id: number): Promise<BodyComposition> => {
        super.validate({id: id}, getByIdSchema)
        return super.remove({body_composition_id: id})
    }

}