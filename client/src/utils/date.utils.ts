import {sortObject} from "./object.utils";

const dayjs = require("dayjs")

export const extractDistinctDatesString = (array: any[], format: string = "DD/MM/YYYY"): string[] =>
    Array.from(
        new Set<string>(sortObject({array: array, key: 'date', dataType: 'date'}).map(item => dateToString(item['date'], format)))
    )

export const dateToString = (date: Date, format: string = "DD/MM/YYYY"): string =>
    dayjs(date).format(format)

export const isSameDay = (date1: Date, date2: Date): boolean =>
    dayjs(date1).isSame(dayjs(date2), 'day')

export const isBefore = (date1: Date, date2: Date): boolean =>
    dayjs(date1).isBefore(dayjs(date2))

export const isAfter = (date1: Date, date2: Date): boolean =>
    dayjs(date1).isAfter(dayjs(date2))
