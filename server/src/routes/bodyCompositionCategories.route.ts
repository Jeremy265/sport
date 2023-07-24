import {GenericRoute} from "./generic.route"
import {BodyCompositionCategoriesController} from "../controllers/bodyCompositionCategories.controller"

export class BodyCompositionCategoriesRoute extends GenericRoute<BodyCompositionCategoriesController> {

    constructor() {
        super(new BodyCompositionCategoriesController())
    }

}
