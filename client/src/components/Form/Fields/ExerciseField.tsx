import * as React from "react"
import {ReactElement, useEffect, useState} from "react"
import {createExercise, getExercises, IExercise} from "../../../services/exercises.service"
import {AutocompleteRenderInputParams, TextField} from "@mui/material"
import CreatableAutoComplete from "./CreatableAutoComplete"
import UnitField from "./UnitField"
import {removeAccentsAndLower} from "../../../utils/utils"
import CustomTextField from "./CustomTextField"

interface Props {
    id: string
    defaultValue?: IExercise
    onChange?: (exercise: IExercise | null) => void
}

const ExerciseField = ({id, defaultValue, onChange}: Props) => {

    const [exercises, setExercises] = useState<IExercise[]>([])
    const [exercisesLoading, setExercisesLoading] = useState<boolean>(true)

    useEffect(() => {
        getExercises()
            .then((exercises: IExercise[]) => {
                setExercises(exercises)
            })
            .catch((error: Error) => {
                alert(error.message)
            })
            .finally(() =>
                setExercisesLoading(false)
            )
    }, [])

    return <CreatableAutoComplete<IExercise>
        id={id}
        itemName="Exercise"
        defaultValue={defaultValue}
        loading={exercisesLoading}
        options={exercises}
        getOptionByInput={(title: string) =>
            exercises.find((exercise: IExercise) => exercise.title === title)
        }
        getNewOption={(title: string = '') => ({
            title: title,
            image: '',
            unit_id: undefined
        })}
        isNewOption={(option: IExercise) =>
            exercises.find((exercise: IExercise) =>
                exercise.title === option.title)
            === undefined
        }
        onSubmit={(option: IExercise) =>
            createExercise({
                ...option,
                unit_id: option.units.unit_id
            }).then((exercise: IExercise) => {
                return exercise
            }).catch((error: Error) => {
                alert(error)
            })
        }
        onChange={
            (option: IExercise) => {
                if (onChange)
                    onChange(option)
            }
        }
        groupBy={(exercise: IExercise) =>
            removeAccentsAndLower(exercise.title[0]).toUpperCase()
        }
        getOptionLabel={(exercise: IExercise | string) =>
            typeof exercise === 'string' ? exercise : exercise.title
        }
        renderInput={(params: AutocompleteRenderInputParams): ReactElement =>
            <TextField {...params} label="Exercise"/>}
        formElements={[
            <CustomTextField id="title" label="Title" autoFocus={true}/>,
            <CustomTextField id="image" label="Image" disabled={true}/>,
            <UnitField id="units"/>
        ]}
    />
}

export default ExerciseField