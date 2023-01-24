import {GenericModel} from "./generic.model";
import {PrismaClient} from "@prisma/client";
import {BodyCompositionCategory, BodyCompositionCategoryVisibility, Condition, Include} from "../utils/types";

export const includeBodyCompositionCategoryVisibilities: Include = {
    body_composition_categories: false,
    users: false
}

export class BodyCompositionCategoryVisibilitiesModel extends GenericModel<BodyCompositionCategoryVisibility> {

    constructor() {
        super(new PrismaClient().body_composition_category_visibilities, includeBodyCompositionCategoryVisibilities);
    }

    removeBy = (conditions: Condition = {}): Promise<BodyCompositionCategoryVisibility> =>
        this.prisma.deleteMany({
            where: conditions
        })

}
