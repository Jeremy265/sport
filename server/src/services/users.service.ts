import {HttpResponseError} from "../utils/CustomErrors";
import {generateAccessToken} from "../utils/jwt";
import {UserModel} from "../models/users.model";
import {comparePasswords, getHashFromPassword} from "../utils/hash";
import {GenericService} from "./generic.service";
import {getByIdSchema, createSchema, updateSchema, loginSchema} from "../schemas/users.schema";
import {User, UserLogin} from "../utils/types";
import {handleError} from "../utils/utils";

export class UsersService extends GenericService<User> {

    constructor() {
        super(new UserModel());
    }

    getById = (id: number): Promise<User> => {
        super.validate({id: id}, getByIdSchema)
        return super.getById({user_id: id})
    }

    create = (user: User): Promise<User | void> => {
        super.validate(user, createSchema)
        return getHashFromPassword(user.password)
            .then((hash: string) => {
                return super.create({...user, password: hash})
            })
    }

    update = (user: User): Promise<User | void> => {
        super.validate(user, updateSchema)
        return getHashFromPassword(user.password)
            .then((hash: string) => {
                return super.update({user_id: user.user_id}, {...user, password: hash})
            })
    }

    remove = (id: number): Promise<User> => {
        super.validate({id: id}, getByIdSchema)
        return super.remove({user_id: id})
    }

    getByEmail = (userLogin: UserLogin): Promise<User> => {
        super.validate(userLogin, loginSchema)
        return this.model.getByEmail(userLogin.email)
            .then((user: any) => {
                return user
            }).catch((e: any) => {
                throw handleError(e)
            })
    }

    login = (userLogin: UserLogin, user: User): Promise<string> => {
        super.validate(userLogin, loginSchema)
        return comparePasswords(userLogin.password, user.password)
            .then((result: boolean) => {
                if (!result)
                    throw new HttpResponseError({status: 403, message: 'Wrong email or password'})
                return generateAccessToken({user_id: user.user_id})
            })
    }

}