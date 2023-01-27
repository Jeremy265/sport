import * as React from 'react'
import {Grid, Stack} from "@mui/material"
import {createTraining, deleteTraining, ITraining} from "../../services/trainings.service"
import {createSet, ISet} from "../../services/sets.service"
import Sets from "../Sets/Sets"
import Title from "../Title/Title"
import BarChart from "../Chart/BarChart"
import {getFormattedDate, groupSetsByUnit, sumSetsWeightByExercise} from "../../utils/utils"
import {IUnit} from "../../services/units.service"
import {IExercise} from "../../services/exercises.service"
import ContentCopyRoundedIcon from '@mui/icons-material/ContentCopyRounded'
import CustomMenu from "../Form/CustomMenu";
import CustomMenuItem from "../Form/CustomMenuItem";
import DeleteIcon from "@mui/icons-material/Delete"

interface Props {
    training: ITraining
    onDuplicateTraining: (training: ITraining) => void
    onDeleteTraining: (training: ITraining) => void
    onUpdateSet: (set: ISet) => void
    onDeleteSet: (set: ISet) => void
}

const Training = ({training, onDuplicateTraining, onDeleteTraining, onUpdateSet, onDeleteSet}: Props) => {

    const handleDeleteTraining = () => {
        deleteTraining(training.training_id)
            .then((training: ITraining) =>
                onDeleteTraining(training)
            )
            .catch((error: Error) =>
                alert(error.message)
            )
    }

    const handleDuplicateTraining = () => {
        createTraining(
            {
                title: 'My training of ' + getFormattedDate(new Date()),
                date: new Date()
            }
        ).then((newTraining: ITraining) => {
            Promise.all(training.sets.map(async (set: ISet) => {
                    return await createSet({
                        ...set,
                        training_id: newTraining.training_id
                    }).then((newSet: ISet) => {
                        newTraining.sets.push(newSet)
                    }).catch((error: Error) => {
                        alert('Error duplicating set ' + set.set_id + ' : ' + error.message)
                    })
                })
            ).then(() => {
                onDuplicateTraining(newTraining)
            }).catch((error: Error) => {
                alert('An error occured : ' + error.message)
            })
        }).catch((error: Error) =>
            alert(error.message)
        )
    }

    return <Grid container spacing={3}>
        <Grid item xs={12}>
            <Stack direction="row"
                   justifyContent="space-between"
                   alignItems="center"
                   spacing={2}>
                <Title>{training.title}</Title>
                <CustomMenu>
                    <CustomMenuItem onClick={handleDuplicateTraining}
                                    icon={<ContentCopyRoundedIcon/>}
                                    text={"Duplicate for today"}/>
                    <CustomMenuItem onClick={handleDeleteTraining}
                                    icon={<DeleteIcon/>}
                                    text={"Delete"}/>
                </CustomMenu>
            </Stack>
        </Grid>
        <Grid item xs={12}>
            {
                Object.values(groupSetsByUnit(training.sets))
                    .map((setsByUnit: {
                            unit: IUnit,
                            sets: ISet[]
                        }, index: number) =>
                            <BarChart
                                key={index}
                                data={
                                    Object.values(sumSetsWeightByExercise(setsByUnit.sets))
                                        .map((weightByExercise: {
                                                exercise: IExercise,
                                                weight: number
                                            }) =>
                                                ({
                                                    x: weightByExercise.exercise.title,
                                                    y: weightByExercise.weight
                                                })
                                        )
                                }
                                xLabel="Exercise"
                                yLabel={`Sum (${setsByUnit.unit.title})`}
                            />
                    )
            }
        </Grid>
        <Grid item xs={12}>
            <Sets
                loading={false}
                sets={training.sets}
                onUpdateSet={onUpdateSet}
                onDeleteSet={onDeleteSet}
            />
        </Grid>
    </Grid>

}

export default Training