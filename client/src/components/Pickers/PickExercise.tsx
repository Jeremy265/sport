import * as React from "react";
import {ReactElement} from "react";
import {createExercise, IExercise} from "../../services/exercises.service";
import {AutocompleteRenderInputParams, TextField} from "@mui/material";
import CreatableAutoComplete from "../Form/CreatableAutoComplete";
import PickUnit from "./PickUnit";
import {removeAccentsAndLower} from "../../utils/utils";

interface Props {
    id: string;
    loading: boolean;
    onChange: (exercise: IExercise | null) => void;
    exercises: IExercise[];
    onAddExercise: (exercise: IExercise) => void;
}

const PickExercise = ({id, loading, onChange, exercises, onAddExercise}: Props) => {

    return <CreatableAutoComplete<IExercise>
        id={id}
        itemName="Exercise"
        loading={loading}
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
                onAddExercise(exercise)
                return exercise
            }).catch((error: Error) => {
                alert(error)
            })
        }
        onChange={(option: IExercise) =>
            onChange(option)
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
            <TextField
                autoFocus
                id="title"
                label="Title"
                type="text"
            />,
            <TextField
                id="image"
                label="Image"
                type="text"
                disabled
            />,
            <PickUnit id={"units"} onChange={() => {
            }}/>
        ]}
    />
}

export default PickExercise