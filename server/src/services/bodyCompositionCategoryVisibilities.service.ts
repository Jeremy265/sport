import {GenericService} from "./generic.service";
import {BodyCompositionCategoryVisibility} from "../utils/types";
import {BodyCompositionCategoryVisibilitiesModel} from "../models/bodyCompositionCategoryVisibilities.model";
import {BodyCompositionCategoryVisibilitiesSchema} from "../schemas/bodyCompositionCategoryVisibilities.schema";

export class BodyCompositionCategoryVisibilitiesService extends GenericService<BodyCompositionCategoryVisibility> {

    constructor() {
        super(new BodyCompositionCategoryVisibilitiesModel(), new BodyCompositionCategoryVisibilitiesSchema(), 'body_composition_category_id');
    }

    removeByUserId = (userId: number) =>
        this.model.removeBy({
            user_id: userId
        })

    updateVisibilities = (userId: number, data: BodyCompositionCategoryVisibility[]) => {
        this.validateSchema(data, this.schema.updateVisibilities())
        return Promise.all(data.map(async (visibility: BodyCompositionCategoryVisibility) => {
                if (visibility.visible)
                    return await this.create(
                        {
                            body_composition_category_id: visibility.body_composition_category_id,
                            user_id: userId,
                            visible: visibility.visible
                        }
                    )
            }
        ))
    }

}
