import {TrainingsModel} from "../models/trainings.model";
import {GenericService} from "./generic.service";
import {getByIdSchema, createSchema, updateSchema} from "../schemas/trainings.schema";
import {Training} from "../utils/types";

export class TrainingsService extends GenericService<Training> {

    constructor() {
        super(new TrainingsModel());
    }

    getById = (id: number): Promise<Training> => {
        super.validate({id: id}, getByIdSchema)
        return super.getById({training_id: id})
    }

    create = (training: Training): Promise<Training | void> => {
        super.validate(training, createSchema)
        return super.create(training)
    }

    update = (training: Training): Promise<Training | void> => {
        super.validate(training, updateSchema)
        return super.update({training_id: training.training_id}, training)
    }

    remove = (id: number): Promise<Training> => {
        super.validate({id: id}, getByIdSchema)
        return super.remove({training_id: id})
    }

}