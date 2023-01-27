import * as React from 'react'
import {useEffect, useState} from 'react'
import {getTrainings, ITraining} from "../../services/trainings.service"
import {Container} from '@mui/material'
import MyRecentTrainings from "../Training/MyRecentTrainings"
import MultipleTimeLineChart from "../Chart/MultipleTimeLineChart"
import {
    extractSetsFromTrainings,
    groupSetsByDate,
    groupSetsByExercise,
    sumSetsWeightByExercise
} from "../../utils/utils"
import {IExercise} from "../../services/exercises.service"
import MultipleSelect from "../Form/MultipleSelect"
import ExerciseField from "../Form/Fields/ExerciseField"
import UnitField from "../Form/Fields/UnitField"
import CustomForm from "../Form/CustomForm"

interface SelectableExercise extends IExercise {
    selected: boolean
}

const Dashboard = () => {
    const [trainings, setTrainings] = useState<ITraining[]>([])
    const [exercises, setExercises] = useState<SelectableExercise[]>([])

    useEffect(() => {
        getTrainings()
            .then((trainings: ITraining[]) => {
                setTrainings(trainings)
                setExercises(
                    Object.values(groupSetsByExercise(extractSetsFromTrainings(trainings)))
                        .map((setsAndExercise: {
                                exercise: IExercise
                            }) =>
                                ({
                                    ...setsAndExercise.exercise,
                                    selected: true
                                })
                        )
                )
            })
            .catch((error: any) => {
                alert(error)
            })
    }, [])

    return (
        <Container maxWidth="lg" sx={{mt: 4, mb: 4}}>
            <MultipleSelect
                title={'Exercises on chart'}
                data={exercises}
                titleKey={'title'}
                onChange={(selectedExercises: SelectableExercise[]) =>
                    setExercises(
                        exercises.map((exercise: SelectableExercise) =>
                            ({
                                ...exercise,
                                selected: selectedExercises.find((selectedExercise: SelectableExercise) =>
                                    selectedExercise.title === exercise.title
                                ) !== undefined
                            })
                        )
                    )
                }
            />
            <MultipleTimeLineChart
                title="Sets evolution"
                data={
                    Object.entries(groupSetsByDate(extractSetsFromTrainings(trainings)))
                        .map(([date, sets]) => {
                            const obj = {
                                x: date
                            }
                            Object.values(sumSetsWeightByExercise(sets)).map((weightAndExercise: {
                                exercise: IExercise,
                                weight: number
                            }) => {
                                Object.assign(obj, {
                                    [weightAndExercise.exercise.title]: weightAndExercise.weight
                                })
                            })
                            return obj
                        })
                }
                keys={
                    exercises
                        .filter((exercise: SelectableExercise) =>
                            exercise.selected
                        )
                        .map((exercise: SelectableExercise) =>
                            ({
                                title: exercise.title,
                                unit: exercise.units.title
                            })
                        )
                }
                xLabel="Time"
                yLabel="Exercises"
            />
            <MyRecentTrainings
                trainings={trainings}
                onDuplicateTraining={
                    (newTraining: ITraining) => {
                        setTrainings([...trainings, newTraining])
                        localStorage.setItem('current_training', JSON.stringify(newTraining))
                        window.location.href = '/training'
                    }
                }
                onDeleteTraining={
                    (trainingtoDelete: ITraining) =>
                        setTrainings(
                            trainings.filter((training: ITraining) =>
                                training.training_id !== trainingtoDelete.training_id
                            )
                        )
                }
                onUpdateTraining={
                    (trainingToUpdate: ITraining) => {
                        const newTrainings = [...trainings]
                        const trainingIndex = newTrainings.findIndex((training: ITraining) =>
                            training.training_id === trainingToUpdate.training_id
                        )
                        newTrainings[trainingIndex] = trainingToUpdate
                        setTrainings(newTrainings)
                    }
                }
            />
        </Container>
    )
}

export default Dashboard