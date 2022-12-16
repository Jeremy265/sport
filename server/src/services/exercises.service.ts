import {ExercisesModel} from "../models/exercises.model";
import {GenericService} from "./generic.service";
import {getByIdSchema, createSchema, updateSchema} from "../schemas/exercises.schema";
import {Exercise} from "../utils/types";

export class ExercisesService extends GenericService<Exercise> {

    constructor() {
        super(new ExercisesModel());
    }

    getById = (id: number): Promise<Exercise> => {
        super.validate({id: id}, getByIdSchema)
        return super.getById({exercise_id: id})
    }

    create = (exercise: Exercise): Promise<Exercise | void> => {
        super.validate(exercise, createSchema)
        return super.create(exercise)
    }

    update = (exercise: Exercise): Promise<Exercise | void> => {
        super.validate(exercise, updateSchema)
        return super.update({exercise_id: exercise.exercise_id}, exercise)
    }

    remove = (id: number): Promise<Exercise> => {
        super.validate({id: id}, getByIdSchema)
        return super.remove({exercise_id: id})
    }

}