import {BodyCompositionCategoriesModel} from "../models/bodyCompositionCategories.model";
import {GenericService} from "./generic.service";
import {getByIdSchema, createSchema, updateSchema} from "../schemas/bodyCompositionCategories.schema";
import {BodyCompositionCategory} from "../utils/types";

export class BodyCompositionCategoriesService extends GenericService<BodyCompositionCategory> {

    constructor() {
        super(new BodyCompositionCategoriesModel());
    }

    getById = (id: number): Promise<BodyCompositionCategory> => {
        super.validate({id: id}, getByIdSchema)
        return super.getById({body_composition_category_id: id})
    }

    create = (body_composition_category: BodyCompositionCategory): Promise<BodyCompositionCategory | void> => {
        super.validate(body_composition_category, createSchema)
        return super.create(body_composition_category)
    }

    update = (body_composition_category: BodyCompositionCategory): Promise<BodyCompositionCategory | void> => {
        super.validate(body_composition_category, updateSchema)
        return super.update({body_composition_category_id: body_composition_category.body_composition_category_id}, body_composition_category)
    }

    remove = (id: number): Promise<BodyCompositionCategory> => {
        super.validate({id: id}, getByIdSchema)
        return super.remove({body_composition_category_id: id})
    }

}