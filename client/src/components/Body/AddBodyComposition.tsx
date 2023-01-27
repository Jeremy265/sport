import * as React from 'react'
import {useEffect, useState} from 'react'
import {Paper} from "@mui/material"
import Title from "../Title/Title"
import {createBodyComposition, IBodyComposition} from "../../services/bodyCompositions.service"
import BodyCompositionCategoryField from "../Form/Fields/BodyCompositionCategoryField"
import {IBodyCompositionCategory} from "../../services/bodyCompositionCategories.service"
import DateField from "../Form/Fields/DateField"
import CustomForm from "../Form/CustomForm"
import NumberField from "../Form/Fields/NumberField"

interface Props {
    bodyCompositionCategories: IBodyCompositionCategory[]
    bodyCompositionCategoriesLoading: boolean
    onAddBodyComposition: (bodyComposition: IBodyComposition) => void
    onAddBodyCompositionCategory: (bodyCompositionCategory: IBodyCompositionCategory) => void
}

const AddBodyComposition = ({
                                bodyCompositionCategories,
                                bodyCompositionCategoriesLoading,
                                onAddBodyComposition,
                                onAddBodyCompositionCategory
                            }: Props) => {

    const [bodyCompositionCategory, setBodyCompositionCategory] = useState<IBodyCompositionCategory>(undefined)

    return <Paper sx={{p: 2}}>
        <Title>Add body composition</Title>
        <CustomForm<IBodyComposition>
            onChange={
                (bodyComposition: IBodyComposition) => {
                    setBodyCompositionCategory(bodyComposition.body_composition_categories)
                }
            }
            onSubmit={
                (bodyComposition: IBodyComposition) =>
                    createBodyComposition({
                        ...bodyComposition,
                        body_composition_category_id: bodyComposition.body_composition_categories.body_composition_category_id,
                        user_id: JSON.parse(localStorage.getItem('user'))?.user_id
                    })
                        .then((bodyComposition: IBodyComposition) => {
                            onAddBodyComposition(bodyComposition)
                        })
                        .catch((error: Error) => {
                            alert(error.message)
                        })
            }
            fields={[
                <DateField
                    id="date"
                    defaultValue={new Date()}
                />,
                <BodyCompositionCategoryField id="body_composition_categories"
                                              loading={bodyCompositionCategoriesLoading}
                                              bodyCompositionCategories={bodyCompositionCategories}
                                              onAddBodyCompositionCategory={(bodyCompositionCategory: IBodyCompositionCategory) =>
                                                 onAddBodyCompositionCategory(bodyCompositionCategory)
                                             }/>,
                <NumberField
                    id="value"
                    label="Value"
                    disabled={!bodyCompositionCategory}
                    unit={bodyCompositionCategory?.units?.title}
                />
            ]}
        />
    </Paper>
}

export default AddBodyComposition