import {GenericController} from "./generic.controller"
import {BodyCompositionCategoriesService} from "../services/bodyCompositionCategories.service"

export class BodyCompositionCategoriesController extends GenericController {

    constructor() {
        super(new BodyCompositionCategoriesService(), true)
    }

}
