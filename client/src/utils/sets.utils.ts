import {ISet} from "../services/sets.service";
import {IExercise} from "../services/exercises.service";

export interface ISetsByExercise {
    [exercise_id: number]: {
        exercise: IExercise,
        sets: ISet[]
    }
}

export const groupSetsByExercise = (sets: ISet[]): ISetsByExercise =>
    sets.reduce((acc: ISetsByExercise, set: ISet) => {
            if (!acc[set.exercise_id])
                acc[set.exercise_id] = {
                    exercise: set.exercises,
                    sets: []
                }
            acc[set.exercise_id].sets.push(set)
            return acc
        }, {} as ISetsByExercise
    )
