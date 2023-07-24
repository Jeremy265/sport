import {GenericModel} from "./generic.model"
import {PrismaClient} from "@prisma/client"
import {Include, User} from "../utils/types"
import {includeTrainings} from "./trainings.model"
import {includeBodyComposition} from "./bodyCompositions.model"

export const includeUsers: Include = {
    body_compositions: {
        include: includeBodyComposition
    },
    trainings: {
        include: includeTrainings
    }
}

export class UserModel extends GenericModel<User> {

    constructor() {
        super(new PrismaClient().users, includeUsers)
    }

}