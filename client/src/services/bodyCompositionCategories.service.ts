import {GenericService} from "./generic.service";
import {AxiosResponse} from "axios";
import {IUnit} from "./units.service";

export interface IBodyCompositionCategory {
    body_composition_category_id?: number;
    title: string;
    unit_id: number;
    units?: IUnit;
    visible?: boolean;
    body_composition_category_visibilities?: { visible: boolean }[]
}

const genericService = new GenericService()
genericService.setApiUrl(genericService.API_URL_BODYCOMPOSITIONCATEGORIES)

const handleObject = (bodyCompositionCategory: IBodyCompositionCategory): IBodyCompositionCategory =>
    ({
        ...bodyCompositionCategory,
        visible: bodyCompositionCategory.body_composition_category_visibilities[0]?.visible ?? false
    })

const handleArray = (bodyCompositionCategories: IBodyCompositionCategory[]): IBodyCompositionCategory[] =>
    bodyCompositionCategories.map((bodyCompositionCategory: IBodyCompositionCategory) =>
        handleObject(bodyCompositionCategory)
    )

export const getBodyCompositionCategories = (): Promise<IBodyCompositionCategory[]> =>
    genericService.get('/')
        .then((response: AxiosResponse) => {
            return handleArray(response.data)
        })

export const createBodyCompositionCategory = (bodyCompositionCategory: IBodyCompositionCategory): Promise<IBodyCompositionCategory> =>
    genericService.post('/', {
        title: bodyCompositionCategory.title,
        unit_id: bodyCompositionCategory.unit_id
    }).then((response: AxiosResponse) => {
        return handleObject(response.data)
    })

export const deleteBodyCompositionCategory = (bodyCompositionCategory: IBodyCompositionCategory): Promise<IBodyCompositionCategory> =>
    genericService.delete('/' + bodyCompositionCategory.body_composition_category_id)
        .then((response: AxiosResponse) => {
            return handleObject(response.data)
        })

export const updateVisibilities = (visibilities: any) => {
    for (const [id, visible] of visibilities) {
        genericService.post('/' + id + '/visibility', {visible: visible})
            .then((response: AxiosResponse) => {
                return handleObject(response.data)
            })
    }
}