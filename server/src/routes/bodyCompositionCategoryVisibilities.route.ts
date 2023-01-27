import {GenericRoute} from "./generic.route"
import {BodyCompositionCategoriesController} from "../controllers/bodyCompositionCategories.controller"
import {
    BodyCompositionCategoryVisibilitiesController
} from "../controllers/bodyCompositionCategoryVisibilities.controller"

export class BodyCompositionCategoryVisibilitiesRoute extends GenericRoute<BodyCompositionCategoryVisibilitiesController> {

    constructor() {
        super(new BodyCompositionCategoryVisibilitiesController())
        this.router.put('/', this.controller.updateVisibilities)
    }

}
