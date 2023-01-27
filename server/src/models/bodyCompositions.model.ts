import {GenericModel} from "./generic.model"
import {PrismaClient} from "@prisma/client"
import {BodyComposition, Include} from "../utils/types"
import {includeBodyCompositionCategories} from "./bodyCompositionCategories.model"

export const includeBodyComposition: Include = {
    body_composition_categories: {
        select : {
            title: true,
            ...includeBodyCompositionCategories
        },
    }
}

export class BodyCompositionsModel extends GenericModel<BodyComposition> {

    constructor() {
        super(new PrismaClient().body_compositions, includeBodyComposition)
    }

}