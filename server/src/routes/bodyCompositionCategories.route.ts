import {GenericRoute} from "./generic.route";
import {BodyCompositionCategoriesController} from "../controllers/bodyCompositionCategories.controller";

export class BodyCompositionCategoriesRoute extends GenericRoute<BodyCompositionCategoriesController> {

    constructor() {
        const controller = new BodyCompositionCategoriesController()
        super(controller, [controller.addUserConditionInclude]);
    }

}
