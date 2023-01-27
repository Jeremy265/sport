import {SetsModel} from "../models/sets.model"
import {GenericService} from "./generic.service"
import {SetsSchema} from "../schemas/sets.schema"
import {Condition, Set} from "../utils/types"

export class SetsService extends GenericService<Set> {

    constructor() {
        super(new SetsModel(), new SetsSchema(), 'set_id')
    }

    getByTrainingId = (conditions: Condition, id: number): Promise<Set[]> => {
        this.validateSchema({training_id: id}, this.schema.getByTrainingId())
        return super.getBy({...conditions, training_id: id})
    }

}