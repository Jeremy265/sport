import {GenericRoute} from "./generic.route"
import {TrainingsController} from "../controllers/trainings.controller"
import {SetsController} from "../controllers/sets.controller"

export class TrainingsRoute extends GenericRoute<TrainingsController> {

    constructor() {
        super(new TrainingsController())
        this.router.get('/:id/sets', new SetsController().getByTrainingId)
    }

}