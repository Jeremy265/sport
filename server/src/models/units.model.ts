import {GenericModel} from "./generic.model"
import {PrismaClient} from "@prisma/client"
import {Include, Unit} from "../utils/types"

export const includeUnits: Include = {
    exercises: false,
    body_composition_categories: false
}

export class UnitsModel extends GenericModel<Unit> {

    constructor() {
        super(new PrismaClient().units, includeUnits)
    }

}