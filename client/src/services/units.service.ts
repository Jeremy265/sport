import {GenericService} from "./generic.service"
import {AxiosResponse} from "axios"

export interface IUnit {
    unit_id?: number
    title: string
}

const genericService = new GenericService()
genericService.setApiUrl(genericService.API_URL_UNITS)

export const getUnits = (): Promise<IUnit[]> =>
    genericService.get('/')
        .then((response: AxiosResponse) => {
            return response.data
        })

export const createUnit = (unit: IUnit): Promise<IUnit> =>
    genericService.post('/', {
        title: unit.title
    }).then((response: AxiosResponse) => {
        return response.data
    })