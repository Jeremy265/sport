import * as React from 'react';
import {Grid} from "@mui/material";
import {deleteTraining, ITraining} from "../../services/trainings.service";
import {ISet} from "../../services/sets.service";
import Sets from "../Sets/Sets";
import Delete from "../Form/Delete";
import Title from "../Title/Title";
import CustomBarChart from "../Chart/BarChart";
import {getSetsByExercises, getWeightSumBySets} from "../../utils/utils";
import {IExercise} from "../../services/exercises.service";
import {IUnit} from "../../services/units.service";
import HorizontalBarChart from "../Chart/HorizontalBarChart";

interface Props {
    training: ITraining;
    onDeleteTraining: (training: ITraining) => void;
    onDeleteSet: (set: ISet) => void;
}

const Training = ({training, onDeleteTraining, onDeleteSet}: Props) => {

        const handleDeleteTraining = () => {
        deleteTraining(training.training_id)
            .then((training: ITraining) =>
                onDeleteTraining(training)
            )
            .catch((error: Error) =>
                alert(error.message)
            )
    }

    return <Grid container spacing={3}>
        <Grid item xs={12} sx={{display: 'flex', justifyContent: 'space-between'}}>
            <Title>{training.title}</Title>
            <Delete onDelete={handleDeleteTraining}/>
        </Grid>
        <Grid item xs={12}>
            {
                Object.values(
                    getSetsByExercises(training.sets)
                        .reduce((acc: { [key: string]: { unit: IUnit, sets: ISet[] } }, setsByExercise: { exercise: IExercise, sets: ISet[] }) => {
                            if (!acc[setsByExercise.exercise.units.title])
                                acc[setsByExercise.exercise.units.title] = {
                                    unit: setsByExercise.exercise.units,
                                    sets: []
                                }
                            setsByExercise.sets.map((set: ISet) =>
                                acc[setsByExercise.exercise.units.title].sets.push(set)
                            )
                            return acc
                        }, {} as { [key: string]: { unit: IUnit, sets: ISet[] } })
                ).map((setsByUnit: { unit: IUnit, sets: ISet[] }) =>
                    <HorizontalBarChart
                        key={setsByUnit.unit.title}
                        data={
                            getWeightSumBySets(setsByUnit.sets)
                        }
                        xLabel={`Sum (${setsByUnit.unit.title})`}
                        yLabel="Exercise"
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