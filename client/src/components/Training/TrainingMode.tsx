import * as React from 'react'
import {useEffect, useState} from 'react'
import {Container, Grid, Paper} from "@mui/material"
import Countdown from "./Countdown"
import {getSets, ITraining} from "../../services/trainings.service"
import AddSet from "../Sets/AddSet"
import {ISet} from "../../services/sets.service"
import Sets from "../Sets/Sets"
import AddTraining from "./AddTraining"

const TrainingMode = () => {
    const [training, setTraining] = useState<ITraining>(
        localStorage.getItem('current_training') !== "undefined"
            ? JSON.parse(localStorage.getItem('current_training'))
            : undefined
    )
    const [sets, setSets] = useState<ISet[]>([])
    const [loading, setLoading] = useState<boolean>(true)

    useEffect(() => {
        if (!training)
            return

        getSets(training)
            .then((sets: ISet[]) => {
                setSets(sets)
            }).catch((error: Error) => {
            alert(error.message)
        }).finally(() => {
            setLoading(false)
        })
    }, [training])

    return <Container maxWidth="lg" sx={{mt: 4, mb: 4}}>
        <Grid container spacing={3}>
            <Grid item xs={12} md={8}>
                <AddTraining
                    training={training}
                    onSubmit={
                        (training: ITraining) => {
                            localStorage.setItem('current_training', JSON.stringify(training))
                            setTraining(training)
                        }
                    }
                />
            </Grid>
            {training &&
                <>
                    <Grid item xs={12} md={4}>
                        <Countdown/>
                    </Grid>
                    <Grid item xs={12} md={8}>
                        <AddSet
                            training_id={training.training_id}
                            onAddSet={
                                (set: ISet) => {
                                    setSets([...sets, set])
                                }
                            }/>
                    </Grid>
                    <Grid item xs={12} md={4}>
                        <Sets
                            loading={loading}
                            sets={sets}
                            onUpdateSet={
                                (setToUpdate: ISet) => {
                                    const newSets = [...sets]
                                    const setIndex = newSets.findIndex((set: ISet) =>
                                        set.set_id === setToUpdate.set_id
                                    )
                                    newSets[setIndex] = setToUpdate
                                    setSets(newSets)
                                }
                            }
                            onDeleteSet={
                                (deletedSet: ISet) => {
                                    setSets(sets.filter((set: ISet) => set.set_id !== deletedSet.set_id))
                                }
                            }/>
                    </Grid>
                </>
            }
        </Grid>
    </Container>

}

export default TrainingMode
