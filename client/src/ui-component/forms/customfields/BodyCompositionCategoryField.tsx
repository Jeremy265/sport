import * as React from "react"
import CreatableAutoComplete from "./CreatableAutoComplete"
import * as Yup from "yup";
import UnitField from "./UnitField";
import CustomFormInput from "./CustomFormInput";
import {
    createBodyCompositionCategory,
    getBodyCompositionCategories,
    IBodyCompositionCategory
} from "../../../services/bodyCompositionCategories.service";

interface Props {
    id: string
    value?: IBodyCompositionCategory
    onChange?: (bodyCompositionCategory: IBodyCompositionCategory) => void
    error?: boolean
    helperText?: string
    onBlur?: () => void
}

const BodyCompositionCategoryField = ({id, value, onChange, error, helperText, onBlur}: Props) => {

    const validationSchema = Yup.object().shape({
        title: Yup.string().max(100).required('Title is required'),
        units: Yup.object().required('Unit is required'),
    })

    const getNewOption = (title: string = ''): IBodyCompositionCategory => ({
        title: title,
        unit_id: undefined
    })

    const handleCreate = (bodyCompositionCategory: IBodyCompositionCategory) =>
        createBodyCompositionCategory({
            ...bodyCompositionCategory,
            unit_id: bodyCompositionCategory.units.unit_id
        })

    return <CreatableAutoComplete<IBodyCompositionCategory>
        id={id}
        error={error}
        helperText={helperText}
        itemName="Body composition category"
        primaryKey="title"
        defaultValue={value}
        getData={getBodyCompositionCategories}
        getNewOption={getNewOption}
        handleSubmit={handleCreate}
        validationSchema={validationSchema}
        onChange={onChange}
        onBlur={onBlur}
        formElements={[
            <CustomFormInput
                id="title"
                label="Title"
            />,
            <UnitField id="units"/>
        ]}
    />
}

export default BodyCompositionCategoryField