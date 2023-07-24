import {isAfter, isBefore} from "./date.utils";
import store from '../store/store'
import {setMessage} from "../store/slices/messageSlice";

export const addObjectToArray = (object: any, array: any[]): any[] =>
    [...array, object]

export const updateObjectOfArray = (object: any, key: string, array: any[]): any[] => {
    const newArray = [...array]
    const objectIndex = array.findIndex((item: any) =>
        object[key as keyof object] === item[key]
    )
    newArray[objectIndex] = object
    return newArray
}

export const removeObjectOfArray = (object: any, key: string, array: any[]): any[] =>
    array.filter((item: any) =>
        object[key] !== item[key]
    )

export const sortObject = ({
                               array,
                               key,
                               dataType = undefined,
                               asc = true
                           }: { array: any[], key?: string, dataType?: "number" | "string" | "date", asc?: boolean }): any[] => {
    try {
        array.sort((a: any, b: any) => {

            if (key && (!a[key] || !b[key])) {
                throw new Error(`Sorting failed : objects must have key ${key}`)
            }

            a = key ? a[key] : a
            b = key ? b[key] : b

            if (typeof a !== typeof b) {
                throw new Error(`Sorting failed : values must have identical type, ${typeof a} and ${typeof b} encountered.`)
            }

            if (dataType === "date")
                return asc ? isAfter(a, b) ? 1 : -1 : isBefore(a, b) ? 1 : -1

            switch (typeof a) {
                case 'number':
                    return asc ? a - b : b - a
                case 'string':
                    return asc ? a.localeCompare(b) : -a.localeCompare(b)
                default:
                    throw new Error(`Sorting failed : data type must be "number", "string" or "date", but object is type of ${typeof a}.`)
            }
        })
        return array
    } catch (error: any) {
        store.dispatch(setMessage({
            text: error.message,
            severity: 'error'
        }))
        return array
    }
}

