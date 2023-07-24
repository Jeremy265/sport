import * as React from 'react'
import {useState} from 'react'
import CustomForm from "./CustomForm";
import {createSet, ISet, updateSet} from "../../../services/sets.service";
import * as Yup from "yup";
import ExerciseField from "../../../ui-component/forms/customfields/ExerciseField";
import {IExercise} from "../../../services/exercises.service";
import CustomFormInput from "../customfields/CustomFormInput";

interface Props {
    initialValues: ISet
    handleResponse: (set: ISet) => void
}

const SetForm = ({initialValues, handleResponse}: Props) => {
    const [unit, setUnit] = useState<string>(initialValues.exercises?.units?.title)

    return <CustomForm<ISet>
        initialValues={initialValues}
        validationSchema={
            Yup.object().shape({
                training_id: Yup.number().required('Training is required'),
                exercises: Yup.object().required('Exercise is required'),
                repetitions: Yup.number().required('Repetitions is required'),
                value: Yup.number().required('Value is required')
            })
        }
        handleSubmit={
            (set: ISet) => {
                set = {
                    ...set,
                    exercise_id: set.exercises.exercise_id
                }
                return set.set_id ? updateSet(set) : createSet(set)
            }
        }
        messageOnResponseOk="Set saved !"
        handleResponse={handleResponse}
        submitLabel={`${initialValues.set_id ? "Update" : "Add"} set`}
    >
        <ExerciseField
            id="exercises"
            onChange={(exercise: IExercise) => setUnit(exercise.units?.title)}/>
        <CustomFormInput
            id="repetitions"
            label="Repetitions"
            type="number"
            inputMode="numeric"
            endAdornment="times"
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

export default SetForm