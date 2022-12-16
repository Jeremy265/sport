import {GenericModel} from "./generic.model";
import {PrismaClient} from "@prisma/client";
import {Exercise} from "../utils/types";

export class ExercisesModel extends GenericModel<Exercise> {

    constructor() {
        super(new PrismaClient().exercises);
    }

}