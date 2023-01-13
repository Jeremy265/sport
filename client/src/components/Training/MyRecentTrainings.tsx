import * as React from 'react';
import {useEffect, useState} from 'react';
import Title from '../Title/Title';
import {deleteTraining, getTrainings, ITraining} from "../../services/trainings.service";
import {Container, Divider, Grid, Paper, Typography} from '@mui/material';
import Calendar from '../Form/Calendar';
import Training from "./Training";
import {ISet} from "../../services/sets.service";

const dayjs = require('dayjs')

export default function MyRecentTrainings() {
    const [trainings, setTrainings] = useState<ITraining[]>([])
    const [selectedDate, setSelectedDate] = useState<Date>(new Date())
    const [selectedTrainings, setSelectedTrainings] = useState<ITraining[]>([])

    useEffect(() => {
        setSelectedTrainings(
            trainings.filter((training: ITraining) =>
                dayjs(selectedDate).isSame(dayjs(training.date), 'day')
            )
        )
    }, [trainings, selectedDate])

    useEffect(() => {
        getTrainings()
            .then((trainings: ITraining[]) => {
                setTrainings(trainings)
            }).catch((error: any) => {
            alert(error)
        })
    }, [])

    return (
        <Container maxWidth="lg" sx={{mt: 4, mb: 4}}>
            <Grid container spacing={3}>
                <Grid item xs={12} md={5}>
                    <Paper sx={{p: 2, display: 'flex', flexDirection: 'column'}}>
                        <Title>My recent trainings</Title>
                        <Calendar
                            onChange={
                                (date: Date) => {
                                    setSelectedDate(date)
                                }
                            }
                            datesToHighlight={
                                trainings.reduce((uniqueDates: Set<string>, training: ITraining) => {
                                    return uniqueDates.add(dayjs(training.date).format("DD/MM/YYYY"))
                                }, new Set())
                            }
                        />
                    </Paper>
                </Grid>
                <Grid item xs={12} md={7}>
                    <Paper sx={{p: 2, display: 'flex', flexDirection: 'column'}}>
                        <Title>{selectedTrainings.length} training{selectedTrainings.length > 1 && 's'} found
                            on {dayjs(selectedDate).format("DD/MM/YYYY")}</Title>
                        {
                            selectedTrainings.length > 0 && selectedTrainings.map((training: ITraining) =>
                                <Container key={training.training_id} maxWidth="lg" sx={{mt: 2}}>
                                    <Divider/>
                                    <Training
                                        training={training}
                                        onDeleteTraining={
                                            (trainingtoDelete: ITraining) => {
                                                setTrainings(
                                                    trainings.filter((training: ITraining) =>
                                                        training.training_id !== trainingtoDelete.training_id
                                                    )
                                                )
                                            }
                                        }
                                        onDeleteSet={
                                            (setToDelete: ISet) => {
                                                const newTrainings = [...trainings];
                                                const trainingIndex = newTrainings.findIndex((training: ITraining) =>
                                                    training.training_id === setToDelete.training_id
                                                )
                                                newTrainings[trainingIndex].sets = training.sets.filter((set: ISet) =>
                                                    set.set_id !== setToDelete.set_id
                                                )
                                                setTrainings(newTrainings);
                                            }
                                        }
                                    />
                                </Container>
                            )
                        }
                    </Paper>
                </Grid>
            </Grid>
        </Container>
    )
}
