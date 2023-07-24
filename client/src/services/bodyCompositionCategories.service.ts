import {GenericService} from "./generic.service"
import {AxiosResponse} from "axios"
import {IUnit} from "./units.service"

export interface IBodyCompositionCategory {
    body_composition_category_id?: number
    title: string
    unit_id: number
    units?: IUnit
}

const genericService = new GenericService()
genericService.setApiUrl(genericService.API_URL_BODYCOMPOSITIONCATEGORIES)

export const getBodyCompositionCategories = (): Promise<IBodyCompositionCategory[]> =>
    genericService.get('/')
        .then((response: AxiosResponse) =>
            response.data
        )

export const createBodyCompositionCategory = (bodyCompositionCategory: IBodyCompositionCategory): Promise<IBodyCompositionCategory> =>
    genericService.post('/', {
        title: bodyCompositionCategory.title,
        unit_id: bodyCompositionCategory.unit_id
    }).then((response: AxiosResponse) =>
        response.data
    )