import {GenericRoute} from "./generic.route"
import {UnitsController} from "../controllers/units.controller"

export class UnitsRoute extends GenericRoute<UnitsController> {

    constructor() {
        super(new UnitsController())
    }

}