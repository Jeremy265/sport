import {GenericService} from "./generic.service"
import {AxiosResponse} from "axios"
import {IBodyCompositionCategory} from "./bodyCompositionCategories.service"

export interface IBodyComposition {
    body_composition_id?: number
    date: Date
    value: number
    body_composition_category_id: number
    user_id?: number
    body_composition_categories?: IBodyCompositionCategory
}

const genericService = new GenericService()
genericService.setApiUrl(genericService.API_URL_BODYCOMPOSITIONS)

export const getBodyCompositions = (): Promise<IBodyComposition[]> =>
    genericService.get('/')
        .then((response: AxiosResponse) => {
            return response.data
        })

export const createBodyComposition = (bodyComposition: IBodyComposition): Promise<IBodyComposition> => {
    return genericService.post('/', {
        date: bodyComposition.date,
        value: bodyComposition.value,
        body_composition_category_id: bodyComposition.body_composition_category_id
    }).then((response: AxiosResponse) => {
        return response.data
    })
}

export const updateBodyComposition = (bodyComposition: IBodyComposition): Promise<IBodyComposition> =>
    genericService.put('/' + bodyComposition.body_composition_id, {
        body_composition_id: bodyComposition.body_composition_id,
        date: bodyComposition.date,
        value: bodyComposition.value,
        body_composition_category_id: bodyComposition.body_composition_category_id
    }).then((response: AxiosResponse) => {
        return response.data
    })

export const deleteBodyComposition = (bodyComposition: IBodyComposition): Promise<IBodyComposition> =>
    genericService.delete('/' + bodyComposition.body_composition_id)
        .then((response: AxiosResponse) => {
            return response.data
        })