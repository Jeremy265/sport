import {GenericRoute} from "./generic.route"
import {BodyCompositionController} from "../controllers/bodyCompositions.controller"

export class BodyCompositionsRoute extends GenericRoute<BodyCompositionController> {

    constructor() {
        super(new BodyCompositionController())
    }

}