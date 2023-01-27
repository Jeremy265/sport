import {GenericModel} from "./generic.model"
import {PrismaClient} from "@prisma/client"
import {Training, Include} from "../utils/types"
import {includeSets} from "./sets.model"

export const includeTrainings: Include = {
    sets: {
        include: includeSets
    }
}

export class TrainingsModel extends GenericModel<Training> {

    constructor() {
        super(new PrismaClient().trainings, includeTrainings)
    }

}