import {GenericModel} from "./generic.model";
import {PrismaClient} from "@prisma/client";
import {User} from "../utils/types";

export class UserModel extends GenericModel<User> {

    constructor() {
        super(new PrismaClient().users);
    }

    getByEmail = (email: string): Promise<any> =>
        this.prisma.findUniqueOrThrow({
            where: {
                email: email
            }
        })

}