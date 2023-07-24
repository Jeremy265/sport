import {GenericController} from "./generic.controller"
import {ExercisesService} from "../services/exercises.service"

export class ExercisesController extends GenericController {

    constructor() {
        super(new ExercisesService(), true)
    }

}
