import {GenericModel} from "./generic.model";
import {PrismaClient} from "@prisma/client";
import {BodyComposition} from "../utils/types";

export class BodyCompositionsModel extends GenericModel<BodyComposition> {

    constructor() {
        super(new PrismaClient().body_compositions);
    }

}