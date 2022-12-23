import axios, {AxiosError, AxiosResponse} from "axios";

export const API_URL = "/api/users";

interface UserSignUp {
    first_name: string;
    last_name: string;
    email: string;
    password: string;
}

interface UserSignIn {
    email: string;
    password: string;
}

export const signUp = (user: UserSignUp): Promise<void> =>
    axios.post(API_URL + "/", user);

export const signIn = (user: UserSignIn): Promise<void> =>
    axios.post(API_URL + "/login", user)
        .then((response: AxiosResponse) => {
            localStorage.setItem('user', JSON.stringify({...response.data, token: response.headers['authorization']}))
        })

export const signOut = (): void => {
    localStorage.removeItem('user')
    window.location.href = '/'
}
