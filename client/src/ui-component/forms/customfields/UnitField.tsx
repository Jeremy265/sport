import * as React from "react"
import {createUnit, getUnits, IUnit} from "../../../services/units.service"
import CreatableAutoComplete from "./CreatableAutoComplete"
import * as Yup from "yup";
import CustomFormInput from "./CustomFormInput";

interface Props {
    id: string
    value?: IUnit
    onChange?: (unit: IUnit) => void
    error?: boolean
    helperText?: string
    onBlur?: () => void
}

const UnitField = ({id, value, onChange, error, helperText, onBlur}: Props) => {

    return <CreatableAutoComplete<IUnit>
        id={id}
        itemName="Unit"
        primaryKey="title"
        defaultValue={value}
        getData={getUnits}
        getNewOption={(title: string = '') => ({
            title: title
        })}
        handleSubmit={createUnit}
        validationSchema={
            Yup.object().shape({
                title: Yup.string().max(100).required('Title is required'),
            })
        }
        onChange={onChange}
        error={error}
        helperText={helperText}
        onBlur={onBlur}
        formElements={[
            <CustomFormInput
                id="title"
                label="Title"
            />
        ]}
    />
}

export default UnitField