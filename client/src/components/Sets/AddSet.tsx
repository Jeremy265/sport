import * as React from 'react';
import {ChangeEvent, useEffect, useState} from 'react';
import {Grid, InputAdornment, Paper, TextField} from "@mui/material";
import Button from "@mui/material/Button";
import Title from "../Title/Title";
import {getExercises, IExercise} from "../../services/exercises.service";
import {createSet, ISet} from "../../services/sets.service";
import PickExercise from "../Pickers/PickExercise";

interface Props {
    training_id: number;
    onAddSet: (set: ISet) => void;
}

const AddSet = ({training_id, onAddSet}: Props) => {

    const [set, setSet] = useState<ISet>({
        repetitions: undefined,
        value: undefined,
        exercise_id: undefined,
        training_id: training_id,
    })

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

    const handleSaveSet = () => {
        createSet(set)
            .then((set: ISet) => {
                onAddSet(set)
            }).catch((error: Error) => {
            alert(error.message)
        })
    }

    return <Paper sx={{p: 2}}>
        <Title>Add sets</Title>
        <Grid container spacing={3}>
            <Grid item xs={12} sx={{mt: 2}}>
                <PickExercise id="exercises"
                              loading={exercisesLoading}
                              exercises={exercises}
                              onAddExercise={(exercise: IExercise) =>
                                  setExercises([...exercises, exercise])
                              }
                              onChange={(exercise: IExercise) =>
                                  setSet({...set, exercise_id: exercise?.exercise_id, exercises: exercise})
                              }/>
            </Grid>
            <Grid item xs={12} md={6}>
                <TextField
                    label="Repetitions"
                    id="repetitions"
                    fullWidth
                    InputProps={{
                        type: 'number',
                        inputMode: 'numeric',
                        endAdornment: <InputAdornment position="end">times</InputAdornment>
                    }}
                    onChange={(event: ChangeEvent<HTMLInputElement>) => {
                        setSet({...set, repetitions: Number(event.target.value)})
                    }}
                />
            </Grid>
            <Grid item xs={12} md={6}>
                <TextField
                    label="Value"
                    id="value"
                    fullWidth
                    InputProps={{
                        type: 'number',
                        inputMode: 'numeric',
                        endAdornment: <InputAdornment position="end">{set.exercises?.units?.title}</InputAdornment>,
                    }}
                    onChange={(event: ChangeEvent<HTMLInputElement>) => {
                        setSet({...set, value: Number(event.target.value)})
                    }}
                />
            </Grid>
            <Grid item xs={12}>
                <Button
                    type="button"
                    fullWidth
                    variant="contained"
                    onClick={handleSaveSet}
                >
                    Save
                </Button>
            </Grid>
        </Grid>
    </Paper>
}

export default AddSet