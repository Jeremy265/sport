import {ISet} from "../services/sets.service";
import {IExercise} from "../services/exercises.service";

export const removeAccentsAndLower = (string: string) =>
    string.normalize("NFD").replace(/[\u0300-\u036f]/g, "").toLowerCase();

export const getSetsByExercises = (sets: ISet[]): { exercise: IExercise; sets: ISet[] }[] =>
    Object.values(sets.reduce((acc: { [key: number]: { exercise: IExercise, sets: ISet[] } }, set: ISet) => {
        if (!acc[set.exercise_id])
            acc[set.exercise_id] = {
                exercise: set.exercises,
                sets: []
            }
        acc[set.exercise_id].sets.push(set)
        return acc
    }, {} as { [key: string]: { exercise: IExercise, sets: ISet[] } }))

export const getWeightSumBySets = (sets: ISet[]) =>
    Object.values(sets.reduce((acc: { [key: number]: { x: string, y: number } }, set: ISet) => {
        if (!acc[set.exercise_id])
            acc[set.exercise_id] = {
                x: set.exercises.title,
                y: 0
            }
        acc[set.exercise_id].y += Number(set.repetitions) * Number(set.value)
        return acc
    }, {} as { [key: number]: { x: string, y: number } }))
