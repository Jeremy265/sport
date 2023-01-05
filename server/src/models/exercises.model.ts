import {GenericModel} from "./generic.model";
import {PrismaClient} from "@prisma/client";
import {Exercise} from "../utils/types";

export const includeExercises = {
    units: {
        select: {
            title: true
        }
    }
}

export class ExercisesModel extends GenericModel<Exercise> {

    constructor() {
        super(new PrismaClient().exercises, includeExercises);
    }

}