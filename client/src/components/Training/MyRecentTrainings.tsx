import * as React from 'react'
import {useState} from 'react'
import Title from '../Title/Title'
import {ITraining} from "../../services/trainings.service"
import {Container, Divider, Grid, Paper} from '@mui/material'
import Calendar from '../Form/Calendar'
import Training from "./Training"
import {ISet} from "../../services/sets.service"

const dayjs = require('dayjs')

interface Props {
    trainings: ITraining[]
    onDuplicateTraining: (training: ITraining) => void
    onUpdateTraining: (training: ITraining) => void
    onDeleteTraining: (training: ITraining) => void
}

const MyRecentTrainings = ({trainings, onDuplicateTraining, onUpdateTraining, onDeleteTraining}: Props) => {
    const [selectedDate, setSelectedDate] = useState<Date>(new Date())

    const getSelectedTrainings = (): ITraining[] =>
        trainings.filter((training: ITraining) =>
            dayjs(selectedDate).isSame(dayjs(training.date), 'day')
        )

    return (
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
                    <Title>{getSelectedTrainings().length} training{getSelectedTrainings().length > 1 && 's'} found
                        on {dayjs(selectedDate).format("DD/MM/YYYY")}</Title>
                    {
                        getSelectedTrainings().length > 0 && getSelectedTrainings().map((training: ITraining) =>
                            <Container key={training.training_id} maxWidth="lg" sx={{mt: 2}}>
                                <Divider/>
                                <Training
                                    training={training}
                                    onDuplicateTraining={onDuplicateTraining}
                                    onDeleteTraining={onDeleteTraining}
                                    onUpdateSet={
                                        (setToUpdate: ISet) => {
                                            const newSets = [...training.sets]
                                            const setIndex = newSets.findIndex((set: ISet) =>
                                                set.set_id === setToUpdate.set_id
                                            )
                                            newSets[setIndex] = setToUpdate
                                            training.sets = newSets
                                            onUpdateTraining(training)
                                        }
                                    }
                                    onDeleteSet={
                                        (setToDelete: ISet) => {
                                            training.sets = training.sets.filter((set: ISet) =>
                                                set.set_id !== setToDelete.set_id
                                            )
                                            onUpdateTraining(training)
                                        }
                                    }
                                />
                            </Container>
                        )
                    }
                </Paper>
            </Grid>
        </Grid>
    )
}

export default MyRecentTrainings