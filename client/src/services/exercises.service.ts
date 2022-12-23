import axios, {AxiosError, AxiosPromise, AxiosResponse} from "axios";

export const API_URL = "/api/exercises";

export interface IExercise {
    exercise_id?: number
    title: string;
    image: string;
}

export const createExercise = (exercise: IExercise): Promise<IExercise> =>
    axios.post(
        API_URL,
        exercise,
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

export const updateExercise = (exercise: IExercise): Promise<IExercise> =>
    axios.put(
        API_URL + '/' + exercise.exercise_id,
        exercise,
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

export const getExercises = (): Promise<IExercise[]> =>
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