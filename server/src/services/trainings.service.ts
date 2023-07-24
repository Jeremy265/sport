import {TrainingsModel} from "../models/trainings.model"
import {GenericService} from "./generic.service"
import {TrainingsSchema} from "../schemas/trainings.schema"
import {Training} from "../utils/types"

export class TrainingsService extends GenericService<Training> {

    constructor() {
        super(new TrainingsModel(), new TrainingsSchema(), 'training_id')
    }

}