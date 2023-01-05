import {GenericModel} from "./generic.model";
import {PrismaClient} from "@prisma/client";
import {Set} from "../utils/types";
import {includeExercises} from "./exercises.model";

export const includeSets = {
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