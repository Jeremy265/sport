import {UnitsModel} from "../models/units.model"
import {GenericService} from "./generic.service"
import {UnitsSchema} from "../schemas/units.schema"
import {Unit} from "../utils/types"

export class UnitsService extends GenericService<Unit> {

    constructor() {
        super(new UnitsModel(), new UnitsSchema(), 'unit_id')
    }

}