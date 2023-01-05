import {GenericService} from "./generic.service";
import {AxiosResponse} from "axios";
import {IExercise} from "./exercises.service";

export interface ISet {
    set_id?: number;
    repetitions: number;
    value: number;
    exercise_id: number;
    training_id: number;
    exercises?: IExercise;
}

const genericService = new GenericService()
genericService.setApiUrl(genericService.API_URL_SETS)

export const createSet = (set: ISet): Promise<ISet> =>
    genericService.post('/', {
        repetitions: set.repetitions,
        value: set.value,
        exercise_id: set.exercise_id,
        training_id: set.training_id
    }).then((response: AxiosResponse) => {
        return response.data
    })

export const deleteSet = (set_id: number): Promise<ISet> =>
    genericService.delete('/' + set_id)
        .then((response: AxiosResponse) => {
            return response.data
        })