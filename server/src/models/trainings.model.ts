import {GenericModel} from "./generic.model";
import {PrismaClient} from "@prisma/client";
import {Training} from "../utils/types";

export class TrainingsModel extends GenericModel<Training> {

    constructor() {
        super(new PrismaClient().trainings);
    }

}