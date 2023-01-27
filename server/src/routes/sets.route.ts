import {GenericRoute} from "./generic.route"
import {TrainingsController} from "../controllers/trainings.controller"
import {SetsController} from "../controllers/sets.controller"

export class SetsRoute extends GenericRoute<SetsController> {

    constructor() {
        super(new SetsController())
    }

}