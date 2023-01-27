import {GenericService} from "./generic.service"
import {AxiosResponse} from "axios"
import {IUnit} from "./units.service"

export interface IExercise {
    exercise_id?: number
    title: string
    image: string
    unit_id: number
    units?: IUnit
}

const genericService = new GenericService()
genericService.setApiUrl(genericService.API_URL_EXERCISES)

export const getExercises = (): Promise<IExercise[]> =>
    genericService.get('/')
        .then((response: AxiosResponse) => {
            return response.data
        })

export const createExercise = (exercise: IExercise): Promise<IExercise> =>
    genericService.post('/', {
        title: exercise.title,
        image: exercise.image,
        unit_id: exercise.unit_id
    }).then((response: AxiosResponse) => {
        return response.data
    })