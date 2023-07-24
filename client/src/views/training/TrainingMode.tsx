import * as React from 'react'
import {useEffect, useState} from 'react'
import {Button, Grid} from "@mui/material"
import Countdown from "../../ui-component/CountDown";
import {dateToString} from "../../utils/date.utils";
import {getSetsByTraining, ITraining} from "../../services/trainings.service";
import {ISet} from "../../services/sets.service";
import Sets from "../set/Sets";
import MainCard from "../../ui-component/cards/MainCard";
import SetForm from "../../ui-component/forms/customforms/SetForm";
import TrainingForm from "../../ui-component/forms/customforms/TrainingForm";
import AnimateButton from "../../ui-component/extended/AnimateButton";
import Box from "@mui/material/Box";
import Loading from "../../ui-component/Loading";
import {updateObjectOfArray} from "../../utils/object.utils";
import {useDispatch} from "react-redux";
import {setMessage} from "../../store/slices/messageSlice";
import config from "../../config"

const TrainingMode = () => {
    const [training, setTraining] = useState<ITraining>(
        localStorage.getItem('current_training') !== "undefined"
            ? JSON.parse(localStorage.getItem('current_training'))
            : undefined
    )
    const [sets, setSets] = useState<ISet[]>([])
    const [loading, setLoading] = useState<boolean>(true)

    const dispatch = useDispatch()

    const handleCreateSet = (set: ISet) =>
        setSets([...sets, set])

    const handleUpdateSet = (setToUpdate: ISet) =>
        setSets(updateObjectOfArray(setToUpdate, 'set_id', sets))

    const handleDeleteSet = (deletedSet: ISet) =>
        setSets(sets.filter((set: ISet) => set.set_id !== deletedSet.set_id))

    useEffect(() => {
        if (!training)
            return

        setLoading(true)
        getSetsByTraining(training)
            .then((sets: ISet[]) =>
                setSets(sets)
            )
            .catch((error: Error) =>
                dispatch(setMessage({text: error.message, severity: 'error'}))
            )
            .finally(() =>
                setLoading(false)
            )
    }, [training])

    return <Grid container spacing={config.gridSpacing}>
        <Grid item xs={12} md={training ? 8 : 12}>
            <MainCard title={training?.title ?? "Start a new training"}>
                <Loading isLoading={training && loading}>
                    <TrainingForm
                        initialValues={training ?? {
                            title: 'My training of ' + dateToString(new Date()),
                            date: new Date()
                        }}
                        handleResponse={
                            (training: ITraining) => {
                                localStorage.setItem('current_training', JSON.stringify(training))
                                setTraining(training)
                            }
                        }
                    />
                    {
                        training &&
                        <Box sx={{mt: 2}}>
                            <AnimateButton>
                                <Button
                                    disableElevation
                                    fullWidth
                                    size="large"
                                    type="submit"
                                    variant="contained"
                                    color="warning"
                                    onClick={() => {
                                        localStorage.removeItem('current_training')
                                        setTraining(undefined)
                                    }}
                                >
                                    Stop training
                                </Button>
                            </AnimateButton>
                        </Box>
                    }
                </Loading>
            </MainCard>
        </Grid>
        {
            training &&
            <>
                <Grid item xs={12} md={4}>
                    <MainCard title="Countdown">
                        <Countdown/>
                    </MainCard>
                </Grid>
                <Grid item xs={12} md={8}>
                    <MainCard title="Add sets">
                        <SetForm
                            initialValues={{
                                training_id: training.training_id,
                                exercise_id: undefined,
                                exercises: undefined,
                                repetitions: undefined,
                                value: undefined
                            }}
                            handleResponse={handleCreateSet}
                        />
                    </MainCard>
                </Grid>
                <Grid item xs={12} md={4}>
                    <Sets
                        sets={sets}
                        onUpdate={handleUpdateSet}
                        onDelete={handleDeleteSet}
                        loading={loading}
                    />
                </Grid>
            </>
        }
    </Grid>
}

export default TrainingMode