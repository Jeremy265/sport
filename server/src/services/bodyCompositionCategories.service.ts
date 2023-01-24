import {BodyCompositionCategoriesModel} from "../models/bodyCompositionCategories.model";
import {GenericService} from "./generic.service";
import {BodyCompositionCategoriesSchema} from "../schemas/bodyCompositionCategories.schema";
import {BodyCompositionCategory, BodyCompositionCategoryVisibility} from "../utils/types";

export class BodyCompositionCategoriesService extends GenericService<BodyCompositionCategory> {

    constructor() {
        super(new BodyCompositionCategoriesModel(), new BodyCompositionCategoriesSchema(), 'body_composition_category_id');
    }

    addUserConditionInclude = (userId: number) =>
        this.model.addUserConditionInclude(userId)

}
