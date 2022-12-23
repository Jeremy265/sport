import * as React from 'react';
import {Container, Grid} from "@mui/material";
import TrainingGeneralInformations from "./TrainingGeneralInformations";
import Chronometer from "./Chronometer";
import {useState} from "react";
import {ITraining} from "../../services/trainings.service";

const Training = () => {
    const [training, setTraining] = useState<ITraining>(JSON.parse(localStorage.getItem('current_training')))

    const onSubmitTraining = (training: ITraining) => {
        setTraining(training)
        localStorage.setItem('current_training', JSON.stringify(training))
    }

    return <Container maxWidth="lg" sx={{mt: 4, mb: 4}}>
        <Grid container spacing={3}>
            <Grid item xs={12} md={training ? 8 : 12} lg={training ? 9 : 12}>
                <TrainingGeneralInformations training={training} onSubmitTraining={onSubmitTraining}/>
            </Grid>
            {training &&
                <>
                    <Grid item xs={12} md={4} lg={3}>
                        <Chronometer/>
                    </Grid>
                    <Grid item xs={12}>
                        <TrainingAddSets/>
                    </Grid>
                </>
            }
        </Grid>
    </Container>

}

export default Training
