import axios, {AxiosError, AxiosResponse} from "axios"
import store from "../store/store";

const allowedRoutes = [
    {
        method: 'post',
        url: '/api/users/login'
    },
    {
        method: 'post',
        url: '/api/users'
    }
]

export class GenericService {

    API_URL = ''
    API_URL_BASE = '/api'
    API_URL_USERS = '/users'
    API_URL_TRAININGS = '/trainings'
    API_URL_UNITS = '/units'
    API_URL_EXERCISES = '/exercises'
    API_URL_SETS = '/sets'
    API_URL_BODYCOMPOSITIONS = '/body-compositions'
    API_URL_BODYCOMPOSITIONCATEGORIES = '/body-compositions/categories'

    request = (method: 'get' | 'post' | 'put' | 'delete', url: string, params: any): Promise<any> => {
        if (!['get', 'post', 'put', 'delete'].includes(method))
            throw Error(`Method ${method} not supported`)

        if ((allowedRoutes.find((allowedRoute: any) =>
                    allowedRoute.method === method && allowedRoute.url === this.API_URL + url)
            ) === undefined
            && (!store.getState().user.token)
        ) {
            // window.location.href = '/signin'
        }


        return axios({
            method: method,
            url: this.API_URL + url,
            data: params,
            headers: {
                'Authorization': 'Bearer ' + store.getState().user.token
            }
        }).then((response: AxiosResponse) => {
            return response
        }).catch((error: AxiosError) => {
            throw Error(`${error.response.statusText} : ${error.response.data}`)
        })
    }

    get = (url: string = '', params: any = {}): Promise<any> =>
        this.request('get', url, params)

    post = (url: string = '', params: any = {}): Promise<any> =>
        this.request('post', url, params)

    put = (url: string, params: any = {}): Promise<any> =>
        this.request('put', url, params)

    delete = (url: string, params: any = {}): Promise<any> =>
        this.request('delete', url, params)

    setApiUrl = (url: string): void => {
        if (![this.API_URL_USERS,
            this.API_URL_TRAININGS,
            this.API_URL_UNITS,
            this.API_URL_EXERCISES,
            this.API_URL_SETS,
            this.API_URL_BODYCOMPOSITIONS,
            this.API_URL_BODYCOMPOSITIONCATEGORIES].includes(url))
            throw new Error('API not supported')
        this.API_URL = this.API_URL_BASE + url
    }
}
