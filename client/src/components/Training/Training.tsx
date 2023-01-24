import * as React from 'react';
import {Grid, Stack} from "@mui/material";
import {createTraining, deleteTraining, ITraining} from "../../services/trainings.service";
import {createSet, ISet} from "../../services/sets.service";
import Sets from "../Sets/Sets";
import Delete from "../Form/Delete";
import Title from "../Title/Title";
import BarChart from "../Chart/BarChart";
import {getFormattedDate, groupSetsByUnit, sumSetsWeightByExercise} from "../../utils/utils";
import {IUnit} from "../../services/units.service";
import {IExercise} from "../../services/exercises.service";
import ContentCopyRoundedIcon from '@mui/icons-material/ContentCopyRounded';
import CustomIconButton from "../Form/CustomIconButton";

interface Props {
    training: ITraining;
    onDuplicateTraining: (training: ITraining) => void;
    onDeleteTraining: (training: ITraining) => void;
    onDeleteSet: (set: ISet) => void;
}

const Training = ({training, onDuplicateTraining, onDeleteTraining, onDeleteSet}: Props) => {

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
                title : 'My training of ' + getFormattedDate(new Date()),
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
        <Grid item xs={12} sx={{display: 'flex', justifyContent: 'space-between'}}>
            <Title>{training.title}</Title>
            <Stack direction="row" spacing={2}>
                <CustomIconButton onClick={handleDuplicateTraining}
                                  icon={<ContentCopyRoundedIcon/>}
                                  toolTip={"Duplicate for today"}/>
                <Delete onDelete={handleDeleteTraining}/>
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
                onDeleteSet={onDeleteSet}
            />
        </Grid>
    </Grid>

}

export default Training