import {BodyCompositionCategoriesModel} from "../models/bodyCompositionCategories.model"
import {GenericService} from "./generic.service"
import {BodyCompositionCategoriesSchema} from "../schemas/bodyCompositionCategories.schema"
import {BodyCompositionCategory} from "../utils/types"

export class BodyCompositionCategoriesService extends GenericService<BodyCompositionCategory> {

    constructor() {
        super(new BodyCompositionCategoriesModel(), new BodyCompositionCategoriesSchema(), 'body_composition_category_id')
    }

}
