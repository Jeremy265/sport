import {GenericModel} from "./generic.model";
import {PrismaClient} from "@prisma/client";
import {BodyCompositionCategory, BodyCompositionCategoryVisibility, Condition, Include} from "../utils/types";

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
    private visibilitiesPrisma = new PrismaClient().body_composition_category_visibilities

    constructor() {
        super(new PrismaClient().body_composition_categories, includeBodyCompositionCategories);
    }

    addUserConditionInclude = (userId: number) => {
        Object.assign(includeBodyCompositionCategories.body_composition_category_visibilities,{
            where: {
                user_id: userId
            }
        })

        console.log(includeBodyCompositionCategories)
    }

    updateVisibilityById = (conditions: Condition = {}, data: BodyCompositionCategoryVisibility): Promise<BodyCompositionCategoryVisibility> => {
        return this.visibilitiesPrisma.findFirstOrThrow({
            where: conditions
        }).then((data: BodyCompositionCategoryVisibility) => {
            return this.visibilitiesPrisma.updateMany({
                where: conditions,
                data: data
            })
        }).catch((e: any) => {
            console.log('ERRORRRRRR', e)
            if (e.name === 'NotFoundError')
                return this.visibilitiesPrisma.create({
                    data: data
                })
            throw e
        })
    }

}
