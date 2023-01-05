import * as React from "react";
import {ReactElement, useEffect, useState} from "react";
import {createExercise, getExercises, IExercise} from "../../services/exercises.service";
import {AutocompleteRenderInputParams, TextField} from "@mui/material";
import CreatableAutoComplete from "../Form/CreatableAutoComplete";
import PickUnit from "./PickUnit";
import {removeAccentsAndLower} from "../../utils/utils";
import {IBodyCompositionCategory} from "../../services/bodyCompositionCategories.service";

interface Props {
    id: string;
    onChange: (exercise: IExercise | null) => void;
    exercises: IExercise[];
    onAddExercise: (exercise: IExercise) => void;
}

const PickExercise = ({id, onChange, exercises, onAddExercise}: Props) => {


    return <CreatableAutoComplete<IExercise>
        id={id}
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
            />,
            <PickUnit id={"units"} onChange={() => {
            }}/>
        ]}
    />
}

export default PickExercise