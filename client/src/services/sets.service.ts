import {GenericService} from "./generic.service"
import {AxiosResponse} from "axios"
import {IExercise} from "./exercises.service"
import {ITraining} from "./trainings.service"

export interface ISet {
    set_id?: number
    repetitions: number
    value: number
    exercise_id: number
    training_id: number
    exercises?: IExercise
    trainings?: ITraining
}

const genericService = new GenericService()
genericService.setApiUrl(genericService.API_URL_SETS)

export const createSet = (set: ISet): Promise<ISet> =>
    genericService.post('/', {
        repetitions: Number(set.repetitions),
        value: Number(set.value),
        exercise_id: set.exercise_id,
        training_id: set.training_id
    }).then((response: AxiosResponse) =>
        response.data
    )

export const updateSet = (set: ISet): Promise<ISet> =>
    genericService.put('/' + set.set_id, {
        set_id: set.set_id,
        repetitions: Number(set.repetitions),
        value: Number(set.value),
        exercise_id: set.exercise_id,
        training_id: set.training_id
    }).then((response: AxiosResponse) =>
        response.data
    )

export const deleteSet = (set_id: number): Promise<ISet> =>
    genericService.delete('/' + set_id)
        .then((response: AxiosResponse) =>
            response.data
        )