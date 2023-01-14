import {BodyCompositionCategoriesModel} from "../models/bodyCompositionCategories.model";
import {GenericService} from "./generic.service";
import {BodyCompositionCategoriesSchema} from "../schemas/bodyCompositionCategories.schema";
import {BodyCompositionCategory, BodyCompositionCategoryVisibility} from "../utils/types";

export class BodyCompositionCategoriesService extends GenericService<BodyCompositionCategory> {

    constructor() {
        super(new BodyCompositionCategoriesModel(), new BodyCompositionCategoriesSchema(), 'body_composition_category_id');
    }

    updateVisibilityById = (id: number, data: BodyCompositionCategoryVisibility): Promise<BodyCompositionCategoryVisibility[]> => {
        this.validateSchema({...data, body_composition_category_id: id}, this.schema.updateVisibilityById())
        return this.model.updateVisibilityById(
            {user_id: data.user_id, body_composition_category_id: id},
            {user_id: data.user_id, body_composition_category_id: id, visible: data.visible})
    }

}
