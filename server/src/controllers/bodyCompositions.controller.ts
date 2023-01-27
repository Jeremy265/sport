import {GenericController} from "./generic.controller"
import {BodyCompositionsService} from "../services/bodyCompositions.service"

export class BodyCompositionController extends GenericController {

    constructor() {
        super(new BodyCompositionsService())
    }

}