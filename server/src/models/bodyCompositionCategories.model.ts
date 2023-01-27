import {GenericModel} from "./generic.model"
import {PrismaClient} from "@prisma/client"
import {BodyCompositionCategory, BodyCompositionCategoryVisibility, Condition, Include} from "../utils/types"

export const includeBodyCompositionCategories: Include = {
    units: {
        select: {
            title: true
        }
    },
    body_composition_category_visibilities: {
        select: {
            visible: true
        }
    }
}

export class BodyCompositionCategoriesModel extends GenericModel<BodyCompositionCategory> {

    constructor() {
        super(new PrismaClient().body_composition_categories, includeBodyCompositionCategories)
    }

    addUserConditionInclude = (userId: number) => {
        Object.assign(includeBodyCompositionCategories.body_composition_category_visibilities,{
            where: {
                user_id: userId
            }
        })
        this.includes = includeBodyCompositionCategories
    }

}
