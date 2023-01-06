import {GenericModel} from "./generic.model";
import {PrismaClient} from "@prisma/client";
import {Training, Include} from "../utils/types";
import {includeExercises} from "./exercises.model";

export const includeTrainings: Include = {
    sets: {
        include: {
            exercises: {
                select: {
                    title: true,
                    ...includeExercises
                },
            }
        }
    }
}

export class TrainingsModel extends GenericModel<Training> {

    constructor() {
        super(new PrismaClient().trainings, includeTrainings);
    }

}