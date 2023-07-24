import {GenericModel} from "./generic.model"
import {PrismaClient} from "@prisma/client"
import {BodyCompositionCategory, Include} from "../utils/types"

export const includeBodyCompositionCategories: Include = {
    units: {
        select: {
            title: true
        }
    }
}

export class BodyCompositionCategoriesModel extends GenericModel<BodyCompositionCategory> {

    constructor() {
        super(new PrismaClient().body_composition_categories, includeBodyCompositionCategories)
    }

}
