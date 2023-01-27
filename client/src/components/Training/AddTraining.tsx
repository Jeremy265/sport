import * as React from 'react'
import {ChangeEvent, useState} from 'react'
import {Grid, Paper} from "@mui/material"
import TextField from "@mui/material/TextField"
import Title from "../Title/Title"
import {createTraining, ITraining, updateTraining} from "../../services/trainings.service"
import Button from "@mui/material/Button"
import DateField from "../Form/Fields/DateField"

interface Props {
    training: ITraining
    onSubmit: (training: ITraining) => void
}

const initialState: ITraining = {
    title: `My training of ${new Date().toLocaleString('fr-FR', {
        day: '2-digit',
        month: '2-digit',
        year: 'numeric'
    })}`,
    date: new Date()
}

const AddTraining = ({training, onSubmit}: Props) => {

    const [trainingForm, setTrainingForm] = useState<{ title: string, date: Date }>(training || initialState)

    const handleSubmit = () => {
        if (training) {
            updateTraining(trainingForm)
                .then((createdTraining: ITraining) => {
                    onSubmit(createdTraining)
                    setTrainingForm(createdTraining)
                })
                .catch((error: Error) => {
                    alert(error)
                })
        } else {
            createTraining(trainingForm)
                .then((createdTraining: ITraining) => {
                    onSubmit(createdTraining)
                    setTrainingForm(createdTraining)
                })
                .catch((error: Error) => {
                    alert(error)
                })
        }
    }

    const handleStop = () => {
        localStorage.removeItem('current_training')
        setTrainingForm(initialState)
        onSubmit(undefined)
    }

    return <Paper sx={{p: 2}}>
        <Title>General informations</Title>
        <Grid container spacing={3} component="form">
            <Grid item xs={12} md={3} sx={{mt: 2}}>
                <DateField
                    id="date"
                    onChange={(date: Date) =>
                        setTrainingForm({
                            ...trainingForm,
                            date: date
                        })
                    }
                    defaultValue={trainingForm.date}
                />
            </Grid>
            <Grid item xs={12} md={9}>
                <TextField
                    margin="normal"
                    required
                    fullWidth
                    id="title"
                    label="TrainingMode title"
                    name="title"
                    autoComplete="off"
                    value={trainingForm.title}
                    onChange={(e: ChangeEvent<HTMLInputElement>) =>
                        setTrainingForm({
                            ...trainingForm,
                            title: e.currentTarget.value
                        })
                    }
                />
            </Grid>
            {
                !training && (
                    <Grid item xs={12}>
                        <Button
                            type="button"
                            fullWidth
                            variant="contained"
                            onClick={handleSubmit}
                        >
                            Start new training
                        </Button>
                    </Grid>
                ) ||
                <>
                    <Grid item xs={12} md={6}>
                        <Button
                            type="button"
                            fullWidth
                            variant="contained"
                            color="success"
                            onClick={handleSubmit}
                        >
                            Update
                        </Button>
                    </Grid>
                    <Grid item xs={12} md={6}>
                        <Button
                            type="button"
                            fullWidth
                            variant="contained"
                            color="warning"
                            onClick={handleStop}
                        >
                            Stop
                        </Button>
                    </Grid>
                </>
            }
        </Grid>
    </Paper>
}

export default AddTraining
