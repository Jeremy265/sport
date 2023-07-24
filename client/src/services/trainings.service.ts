import {GenericService} from "./generic.service"
import {AxiosResponse} from "axios"
import {ISet} from "./sets.service"

export interface ITraining {
    training_id?: number
    title: string
    date: Date
    user_id?: number
    sets?: ISet[]
    created_at?: Date
    updated_at?: Date
}

const genericService = new GenericService()
genericService.setApiUrl(genericService.API_URL_TRAININGS)

export const getTrainings = (): Promise<ITraining[]> =>
    genericService.get('/')
        .then((response: AxiosResponse) =>
            response.data
        )

export const createTraining = (training: ITraining): Promise<ITraining> =>
    genericService.post('/', {
        title: training.title,
        date: training.date
    }).then((response: AxiosResponse) =>
        response.data
    )

export const updateTraining = (training: ITraining): Promise<ITraining> =>
    genericService.put('/' + training.training_id, {
        title: training.title,
        date: training.date
    }).then((response: AxiosResponse) =>
        response.data
    )

export const deleteTraining = (id: number): Promise<ITraining> =>
    genericService.delete('/' + id)
        .then((response: AxiosResponse) =>
            response.data
        )

export const getSetsByTraining = (training: ITraining): Promise<ISet[]> =>
    genericService.get('/' + training.training_id + '/sets')
        .then((response: AxiosResponse) =>
            response.data
        )
