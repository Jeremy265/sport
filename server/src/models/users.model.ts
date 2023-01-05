import {GenericModel} from "./generic.model";
import {PrismaClient} from "@prisma/client";
import {User} from "../utils/types";
import {includeTrainings} from "./trainings.model";
import {includeBodyComposition} from "./bodyCompositions.model";

export const includeUsers = {
    body_compositions: {
        include: includeBodyComposition
    },
    trainings: {
        include: includeTrainings
    }
}

export class UserModel extends GenericModel<User> {

    constructor() {
        super(new PrismaClient().users, includeUsers);
    }

    getByEmail = (email: string): Promise<any> =>
        this.prisma.findUniqueOrThrow({
            where: {
                email: email
            }
        })

}