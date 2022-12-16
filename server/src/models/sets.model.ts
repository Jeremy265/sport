import {GenericModel} from "./generic.model";
import {PrismaClient} from "@prisma/client";
import {Set} from "../utils/types";

export class SetsModel extends GenericModel<Set> {

    constructor() {
        super(new PrismaClient().sets);
    }

}