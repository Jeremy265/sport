import * as React from 'react'
import {Paper} from "@mui/material"
import Title from "../Title/Title"
import {createSet, ISet} from "../../services/sets.service"
import ExerciseField from "../Form/Fields/ExerciseField"
import CustomForm from "../Form/CustomForm"
import NumberField from "../Form/Fields/NumberField"
import {useState} from "react"
import {IExercise} from "../../services/exercises.service"

interface Props {
    training_id: number
    onAddSet: (set: ISet) => void
}

const AddSet = ({training_id, onAddSet}: Props) => {

    const [set, setSet] = useState<ISet>()

    return <Paper sx={{p: 2}}>
        <Title>Add sets</Title>
        <CustomForm
            fields={[
                <ExerciseField id="exercises"/>,
                <NumberField id="repetitions" label="Repetitions" unit="times"/>,
                <NumberField id="value" label="Value" unit={set?.exercises?.units?.title}/>,
            ]}
            onChange={
                (set: ISet) =>
                    setSet(set)
            }
            onSubmit={
                (set: ISet) =>
                    createSet({
                        ...set,
                        exercise_id: set.exercises.exercise_id,
                        training_id: training_id
                    }).then((set: ISet) => {
                        onAddSet(set)
                    }).catch((error: Error) => {
                        alert(error.message)
                    })
            }
        />
    </Paper>
}

export default AddSet