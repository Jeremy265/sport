import {IBodyComposition} from "../services/bodyCompositions.service";
import {ISet} from "../services/sets.service";
import {dateToString, extractDistinctDatesString} from "./date.utils";
import {extractSetsFromTrainings} from "./trainings.utils";
import {sortObject} from "./object.utils";

export interface IChartDataV2 {
    name: string,
    data: any[]
}

interface IChartData<T> {
    [key: string]: T
}

const sortChartDataByName = (chartData: IChartDataV2[]) =>
    sortObject(
        {
            array: chartData,
            key: 'name',
            dataType: 'string'
        })

export const getChartDataFromSets = (sets: ISet[]): IChartData<number> =>
    sets.reduce((series: IChartData<number>, set: ISet) => {
        const exerciseTitle = `${set.exercises.title} (Sum in ${set.exercises.units.title})`
        if (!series[exerciseTitle]) {
            series[exerciseTitle] = 0
        }
        series[exerciseTitle] += Number(set.value * set.repetitions)
        return series
    }, {})

export const getTimeLineChartDataFromTrainings = (trainings: any, format: string = 'DD/MM/YYYY'): IChartDataV2[] => {
    const sets = extractSetsFromTrainings(trainings)
    const valuesByExercise = sets.reduce((valuesByExercise: { [category: string]: { date: string, value: number }[] }, set: ISet) => {
        const exercise = `${set.exercises.title} (Sum in ${set.exercises.units.title})`
        if (!valuesByExercise[exercise])
            valuesByExercise[exercise] = []
        valuesByExercise[exercise].push({
            date: dateToString(set.trainings.date, format),
            value: set.value * set.repetitions
        })
        return valuesByExercise
    }, {})

    return sortChartDataByName(Object.entries(valuesByExercise).map(([exercise, values]) => ({
            name: exercise,
            data: extractDistinctDatesString(trainings, format).map((date: string) =>
                values.filter((value: { date: string, value: number }) =>
                    value.date === date
                ).reduce((acc: number, value: { date: string, value: number }) =>
                    !acc ? Number(value.value) : Number(acc) + Number(value.value), null
                )
            )
        })
    ))
}

export const getTimeLineChartDataFromBodyCompositions = (bodyCompositions: IBodyComposition[], format = 'DD/MM/YYYY'): IChartDataV2[] => {
    const valuesByCategory = bodyCompositions.reduce((valuesByDateByCategory: { [category: string]: { date: string, value: number }[] }, bodyComposition: IBodyComposition) => {
        const category = `${bodyComposition.body_composition_categories.title} (Average in ${bodyComposition.body_composition_categories.units.title})`
        if (!valuesByDateByCategory[category])
            valuesByDateByCategory[category] = []
        valuesByDateByCategory[category].push({
            date: dateToString(bodyComposition.date, format),
            value: bodyComposition.value
        })
        return valuesByDateByCategory
    }, {})

    return sortChartDataByName(Object.entries(valuesByCategory).map(([category, values]) => ({
            name: category,
            data: extractDistinctDatesString(bodyCompositions, format).map((date: string) => {
                const v: { date: string, value: number }[] = values.filter((value: { date: string, value: number }) =>
                    value.date === date
                )

                const avg = v.reduce((acc: number, value: { date: string, value: number }) =>
                    Number(acc) + Number(value.value), null
                ) / v.length

                return avg ? avg.toFixed(1) : null
            })
        })
    ))
}