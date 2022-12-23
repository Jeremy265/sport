import axios, {AxiosError, AxiosPromise, AxiosResponse} from "axios";

export const API_URL = "/api/trainings";

export interface ITraining {
    training_id?: number
    title: string;
    date: Date;
}

export const createTraining = (training: ITraining): Promise<ITraining> =>
    axios.post(
        API_URL,
        training,
        {
            headers: {
                'Authorization': 'Bearer ' + JSON.parse(localStorage.getItem('user')).token
            }
        }
    ).then((response: AxiosResponse) =>
        response.data
    ).catch((error: AxiosError) => {
        console.log(error)
    });

export const updateTraining = (training: ITraining): Promise<ITraining> =>
    axios.put(
        API_URL + '/' + training.training_id,
        training,
        {
            headers: {
                'Authorization': 'Bearer ' + JSON.parse(localStorage.getItem('user')).token
            }
        }
    ).then((response: AxiosResponse) =>
        response.data
    ).catch((error: AxiosError) => {
        console.log(error)
    });

export const getTrainings = (): any =>
    axios.get(
        API_URL,
        {
            headers: {
                'Authorization': 'Bearer ' + JSON.parse(localStorage.getItem('user')).token
            }
        }
    ).then((response: AxiosResponse) =>
        response.data
    ).catch((error: AxiosError) => {
        console.log(error)
    });