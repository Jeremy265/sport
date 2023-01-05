import {GenericModel} from "./generic.model";
import {PrismaClient} from "@prisma/client";
import {BodyCompositionCategory} from "../utils/types";

export const includeBodyCompositionCategories = {
    units: {
        select: {
            title: true
        }
    }
}

export class BodyCompositionCategoriesModel extends GenericModel<BodyCompositionCategory> {

    constructor() {
        super(new PrismaClient().body_composition_categories, includeBodyCompositionCategories);
    }

}