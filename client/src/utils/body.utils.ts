import {IBodyComposition} from "../services/bodyCompositions.service";
import {sortObject} from "./object.utils";

export interface IBodyCompositionsByCategory {
    category: string
    bodyCompositions: IBodyComposition[]
}

export const groupBodyCompositionsByCategory = (bodyCompositions: IBodyComposition[]): IBodyCompositionsByCategory[] => {
    const bodyCompositionsByCategory = bodyCompositions.reduce((acc: { [category: string]: IBodyComposition[] }, bodyComposition: IBodyComposition) => {
        const category = `${bodyComposition.body_composition_categories.title} (${bodyComposition.body_composition_categories.units.title})`
        if (!acc[category])
            acc[category] = []
        acc[category].push(bodyComposition)
        return acc
    }, {})

    return Object.entries(bodyCompositionsByCategory).map(([category, bodyCompositions]) => ({
            category: category,
            bodyCompositions: bodyCompositions
        })
    )
}

