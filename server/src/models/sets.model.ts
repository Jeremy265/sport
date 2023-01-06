import {GenericModel} from "./generic.model";
import {PrismaClient} from "@prisma/client";
import {Include, Set} from "../utils/types";
import {includeExercises} from "./exercises.model";

export const includeSets: Include = {
    exercises: {
        select: {
            title: true,
            ...includeExercises
        },
    }
}

export class SetsModel extends GenericModel<Set> {

    constructor() {
        super(new PrismaClient().sets, includeSets)
    }
}