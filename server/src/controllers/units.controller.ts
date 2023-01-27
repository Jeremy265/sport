import {GenericController} from "./generic.controller"
import {UnitsService} from "../services/units.service"

export class UnitsController extends GenericController {

    constructor() {
        super(new UnitsService(), true)
    }

}
