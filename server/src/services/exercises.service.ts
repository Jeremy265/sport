import {ExercisesModel} from "../models/exercises.model"
import {GenericService} from "./generic.service"
import {ExercisesSchema} from "../schemas/exercises.schema"
import {Exercise} from "../utils/types"

export class ExercisesService extends GenericService<Exercise> {

    constructor() {
        super(new ExercisesModel(), new ExercisesSchema(), 'exercise_id')
    }

}