import {AxiosResponse} from "axios";
import {GenericService} from "./generic.service";
import {IBodyCompositionCategory} from "./bodyCompositionCategories.service";

interface User {
    user_id?: number;
    first_name: string;
    last_name: string;
    email: string;
    password: string;
}

interface UserSignIn {
    email: string;
    password: string;
}

const genericService = new GenericService()
genericService.setApiUrl(genericService.API_URL_USERS)

export const signUp = (user: User): Promise<void> =>
    genericService.post('/', user)
        .then((response: AxiosResponse) => {
            return response.data
        })

export const signIn = (user: UserSignIn): Promise<void> =>
    genericService.post('/login', user)
        .then((response: AxiosResponse) => {
            localStorage.setItem('user', JSON.stringify({...response.data, token: response.headers['authorization']}))
        })


export const signOut = (): void => {
    localStorage.removeItem('user')
    window.location.href = '/'
}