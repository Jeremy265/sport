import * as React from "react"
import {IUnit} from "../../../services/units.service"
import CreatableAutoComplete from "./CreatableAutoComplete"
import * as Yup from "yup";
import {createExercise, getExercises, IExercise} from "../../../services/exercises.service";
import UnitField from "./UnitField";
import CustomFormInput from "./CustomFormInput";

interface Props {
    id: string
    value?: IExercise
    onChange?: (unit: IUnit) => void
    error?: boolean
    helperText?: string
    onBlur?: () => void
}

const ExerciseField = ({id, value, onChange, error, helperText, onBlur}: Props) => {

    const validationSchema = Yup.object().shape({
        title: Yup.string().max(100).required('Title is required'),
        units: Yup.object().required('Unit is required'),
    })

    const getNewOption = (title: string = ''): IExercise => ({
        title: title,
        image: undefined,
        unit_id: undefined
    })

    const handleCreate = (exercise: IExercise) =>
        createExercise({
            ...exercise,
            unit_id: exercise.units.unit_id
        })

    return <CreatableAutoComplete<IExercise>
        id={id}
        itemName="Exercise"
        primaryKey="title"
        defaultValue={value}
        getData={getExercises}
        getNewOption={getNewOption}
        handleSubmit={handleCreate}
        validationSchema={validationSchema}
        onChange={onChange}
        error={error}
        helperText={helperText}
        onBlur={onBlur}
        formElements={[
            <CustomFormInput
                id="title"
                label="Title"
            />,
            <CustomFormInput
                id="image"
                label="Image"
                disabled
            />,
            <UnitField id="units"/>
        ]}
    />
}

export default ExerciseField