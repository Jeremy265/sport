import {GenericService} from "./generic.service"
import {AxiosResponse} from "axios";

export interface IUser {
    user_id?: number
    first_name?: string
    last_name?: string
    email?: string
    password?: string
    token?: string
}

const genericService = new GenericService()
genericService.setApiUrl(genericService.API_URL_USERS)

export const signUp = (user: IUser): Promise<IUser> =>
    genericService.post('/', user)
        .then((response: AxiosResponse) =>
            response.data
        )

export const signIn = (user: IUser): Promise<IUser> =>
    genericService.post('/login', user)
        .then((response: AxiosResponse) => ({
                ...response.data,
                token: response.headers['authorization']
            })
        )