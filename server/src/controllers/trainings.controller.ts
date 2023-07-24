import {GenericController} from "./generic.controller"
import {TrainingsService} from "../services/trainings.service"

export class TrainingsController extends GenericController {

    constructor() {
        super(new TrainingsService())
    }

}
