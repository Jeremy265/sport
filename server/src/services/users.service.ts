import {HttpResponseError} from "../utils/CustomErrors"
import {generateAccessToken} from "../utils/jwt"
import {UserModel} from "../models/users.model"
import {comparePasswords, getHashFromPassword} from "../utils/hash"
import {GenericService} from "./generic.service"
import {UsersSchema} from "../schemas/users.schema"
import {User, UserLogin} from "../utils/types"
import {handleError} from "../utils/utils"
import {log} from "../utils/log";

export class UsersService extends GenericService<User> {

    constructor() {
        super(new UserModel(), new UsersSchema(), 'user_id')
    }

    create = (user: User): Promise<User | void> => {
        return getHashFromPassword(user.password)
            .then((hash: string) => {
                return super.create({...user, password: hash})
            })
    }

    update = (user: User): Promise<User | void> => {
        return getHashFromPassword(user.password)
            .then((hash: string) => {
                return super.updateById(user.user_id, {...user, password: hash})
            })
    }

    getByEmail = (userLogin: UserLogin): Promise<User> => {
        super.validateSchema(userLogin, this.schema.login())
        return this.model.getById({
            email: userLogin.email
        }).then((user: User) => {
            return user
        }).catch((e: any) => {
            throw handleError(e)
        })
    }

    login = (userLogin: UserLogin, user: User): Promise<string> => {
        this.validateSchema(userLogin, this.schema.login())
        return comparePasswords(userLogin.password, user.password)
            .then((result: boolean) => {
                if (!result) {
                    log(`Wrong login ${userLogin.email}:${userLogin.password}`, 'login')
                    throw new HttpResponseError(403, 'Wrong email or password')
                }

                log(`Successful login ${userLogin.email}:${userLogin.password}`, 'login')

                return generateAccessToken({
                    user_id: user.user_id,
                    first_name: user.first_name,
                    last_name: user.last_name
                })
            })
    }

}
