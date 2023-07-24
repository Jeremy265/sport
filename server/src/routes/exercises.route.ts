import {GenericRoute} from "./generic.route"
import {ExercisesController} from "../controllers/exercises.controller"

export class ExercisesRoute extends GenericRoute<ExercisesController> {

    constructor() {
        super(new ExercisesController())
    }

}