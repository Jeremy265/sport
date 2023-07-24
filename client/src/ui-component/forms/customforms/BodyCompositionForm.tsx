import * as React from 'react'
import {useState} from 'react'
import * as Yup from "yup";
import CustomFormInput from "../customfields/CustomFormInput";
import {
    createBodyComposition,
    IBodyComposition,
    updateBodyComposition
} from "../../../services/bodyCompositions.service";
import CustomForm from "./CustomForm";
import DateField from "../customfields/DateField";
import BodyCompositionCategoryField from "../customfields/BodyCompositionCategoryField";
import {IBodyCompositionCategory} from "../../../services/bodyCompositionCategories.service";

interface Props {
    initialValues: IBodyComposition
    handleResponse: (bodyComposition: IBodyComposition) => void
}

const BodyCompositionForm = ({initialValues, handleResponse}: Props) => {

    const [unit, setUnit] = useState<string>(initialValues.body_composition_categories?.units?.title)

    return <CustomForm<IBodyComposition>
        initialValues={initialValues}
        validationSchema={
            Yup.object().shape({
                date: Yup.date().required('Date is required'),
                body_composition_categories: Yup.object().required('Category is required'),
                value: Yup.number().required('Value is required')
            })
        }
        handleSubmit={
            (bodyComposition: IBodyComposition) => {
                bodyComposition = {
                    ...bodyComposition,
                    body_composition_category_id: bodyComposition.body_composition_categories.body_composition_category_id
                }
                return bodyComposition.body_composition_id
                    ? updateBodyComposition(bodyComposition)
                    : createBodyComposition(bodyComposition)
            }
        }
        messageOnResponseOk="Body composition saved !"
        handleResponse={handleResponse}
        submitLabel={`${initialValues.body_composition_id ? "Update" : "Add"} body composition`}
    >
        <DateField
            id="date"/>
        <BodyCompositionCategoryField
            id="body_composition_categories"
            onChange={(bodyCompositionCategory: IBodyCompositionCategory) => setUnit(bodyCompositionCategory.units?.title)}
        />
        <CustomFormInput
            id="value"
            label="Value"
            type="number"
            inputMode="decimal"
            endAdornment={unit}
        />
    </CustomForm>
}

export default BodyCompositionForm