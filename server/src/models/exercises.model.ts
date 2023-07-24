import {GenericModel} from "./generic.model"
import {PrismaClient} from "@prisma/client"
import {Exercise, Include} from "../utils/types"

export const includeExercises: Include = {
    units: {
        select: {
            title: true
        }
    }
}

export class ExercisesModel extends GenericModel<Exercise> {

    constructor() {
        super(new PrismaClient().exercises, includeExercises)
    }

}