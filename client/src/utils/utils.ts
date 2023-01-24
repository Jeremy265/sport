import {ISet} from "../services/sets.service";
import {IExercise} from "../services/exercises.service";
import {IBodyComposition} from "../services/bodyCompositions.service";
import {ITraining} from "../services/trainings.service";
import {IUnit} from "../services/units.service";

const dayjs = require("dayjs")

export interface WeightByExercise {
    [exercise_id: number]: {
        exercise: IExercise,
        weight: number;
    }
}

export interface SetsByDate {
    [date: string]: ISet[]
}


export interface SetsByExercise {
    [exercise_id: number]: {
        exercise: IExercise,
        sets: ISet[]
    }
}

export interface SetsByUnit {
    [unit_id: number]: {
        unit: IUnit,
        sets: ISet[]
    }
}

export interface BodyCompositionsByDate {
    [date: string]: IBodyComposition[]
}

export const removeAccentsAndLower = (string: string) =>
    string.normalize("NFD").replace(/[\u0300-\u036f]/g, "").toLowerCase();

export const getFormattedDate = (date: Date, format: string = 'DD/MM/YYYY') =>
    dayjs(date).format(format)

export const removeDuplicatesFromArrayByKey = (array: any[], key: string) => {
    return array.reduce((arr: any[], item: any) => {
        const removed = arr.filter(i => i[key] !== item[key]);
        return [...removed, item];
    }, []);
};

export const extractSetsFromTrainings = (trainings: ITraining[]) =>
    trainings.map((training: ITraining) =>
        training.sets
    ).reduce((acc: ISet[], sets: ISet[]) =>
        [...acc, ...sets], []
    )

export const groupBodyCompositionsByDate = (bodyCompositions: IBodyComposition[]): BodyCompositionsByDate =>
    bodyCompositions.reduce((acc: BodyCompositionsByDate, bodyComposition: IBodyComposition) => {
        const date = getFormattedDate(bodyComposition.date)
        if (!acc[date])
            acc[date] = []
        acc[date].push(bodyComposition)
        return acc
    }, {} as BodyCompositionsByDate)


export const groupSetsByExercise = (sets: ISet[]): SetsByExercise =>
    sets.reduce(
        (acc: SetsByExercise, set: ISet) => {
            if (!acc[set.exercise_id])
                acc[set.exercise_id] = {
                    exercise: set.exercises,
                    sets: []
                }
            acc[set.exercise_id].sets.push(set)
            return acc
        }, {} as SetsByExercise
    )

export const groupSetsByDate = (sets: ISet[]): SetsByDate =>
    sets.reduce(
        (acc: SetsByDate, set: ISet) => {
            const date = getFormattedDate(set.trainings.date)
            if (!acc[date])
                acc[date] = []
            acc[date].push(set)
            return acc
        }, {} as SetsByDate
    )

export const groupSetsByUnit = (sets: ISet[]): SetsByUnit =>
    sets.reduce(
        (acc: SetsByUnit, set: ISet) => {
            if (!acc[set.exercises.unit_id])
                acc[set.exercises.unit_id] = {
                    unit: set.exercises.units,
                    sets: []
                }
            acc[set.exercises.unit_id].sets.push(set)
            return acc
        }, {} as SetsByUnit
    )

export const sumSetsWeightByExercise = (sets: ISet[]): WeightByExercise =>
    sets.reduce((acc: WeightByExercise, set: ISet) => {
            if (!acc[set.exercise_id])
                acc[set.exercise_id] = {
                    exercise: set.exercises,
                    weight: 0
                }
            acc[set.exercise_id].weight += Number(set.repetitions) * Number(set.value)
            return acc
        }, {} as WeightByExercise
    )

export const sortObjectsByKey = ({
                                     array,
                                     key,
                                     dataType = undefined,
                                     asc = true
                                 }: { array: any[], key: string, dataType?: "number" | "string" | "date" | undefined, asc?: boolean }): any[] =>
    array.sort((a: any, b: any) => {
        if (typeof a[key] !== typeof b[key]) {
            alert("Sorting failed : values must have identical type")
            return 0
        }

        if (dataType && dataType === "date")
            return asc ? dayjs(a[key]).isAfter(dayjs(b[key])) ? 1 : -1 : dayjs(a[key]).isBefore(dayjs(b[key])) ? 1 : -1

        switch (typeof a[key]) {
            case 'number':
                return asc ? a[key] - b[key] : b[key] - a[key]
            case 'string':
                return asc ? a[key].localeCompare(b[key]) : -a[key].localeCompare(b[key])
            default:
                alert("Sorting failed : data type not supported")
                return 0
        }
    })
