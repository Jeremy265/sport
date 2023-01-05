import {UnitsModel} from "../models/units.model";
import {GenericService} from "./generic.service";
import {getByIdSchema, createSchema, updateSchema} from "../schemas/units.schema";
import {Unit} from "../utils/types";

export class UnitsService extends GenericService<Unit> {

    constructor() {
        super(new UnitsModel());
    }

    getById = (id: number): Promise<Unit> => {
        super.validate({id: id}, getByIdSchema)
        return super.getById({unit_id: id})
    }

    create = (unit: Unit): Promise<Unit | void> => {
        super.validate(unit, createSchema)
        return super.create(unit)
    }

    update = (unit: Unit): Promise<Unit | void> => {
        super.validate(unit, updateSchema)
        return super.update({unit_id: unit.unit_id}, unit)
    }

    remove = (id: number): Promise<Unit> => {
        super.validate({id: id}, getByIdSchema)
        return super.remove({unit_id: id})
    }

}