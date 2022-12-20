import * as React from 'react';
import {useState} from 'react';
import {Grid, Paper, TextFieldProps} from "@mui/material";
import TextField from "@mui/material/TextField";
import Title from "../Title/Title";
import {DatePicker, LocalizationProvider} from "@mui/x-date-pickers";
import {AdapterDayjs} from "@mui/x-date-pickers/AdapterDayjs";
import {Dayjs} from "dayjs";
import 'dayjs/locale/fr';
import {CreateTraining, createTraining} from "../../services/trainings.service";
import {AxiosError, AxiosResponse} from "axios";
import Form from "../Form/Form";

const dayjs = require("dayjs");

const TrainingGeneralInformations = () => {

    const [date, setDate] = useState<Dayjs>(dayjs(new Date()))

    const onSubmit = (data: CreateTraining) => {
        createTraining(data).then((response: AxiosResponse) => {
            console.log(response)
        }).catch((error: AxiosError) => {
            console.log(error)
        })
    }

    return <Paper sx={{p: 2}}>
        <Title>General informations</Title>
        <Form onSubmit={onSubmit} fields={[]}>
            <Grid item xs={12} sx={{mt: 2}}>
                <LocalizationProvider dateAdapter={AdapterDayjs} adapterLocale={'fr'}>
                    <DatePicker
                        label="Training date"
                        value={date}
                        onChange={(date: any) => {
                            setDate(dayjs(date));
                        }}
                        renderInput={(params: TextFieldProps) => <TextField required {...params} />}
                    />
                </LocalizationProvider>
            </Grid>
            <Grid item xs={12}>
                <TextField
                    margin="normal"
                    required
                    fullWidth
                    id="title"
                    label="Training title"
                    name="title"
                    autoComplete="off"
                    defaultValue={"My training of " + date.format('DD/MM/YYYY')}
                    autoFocus
                />
            </Grid>
        </Form>

    </Paper>
}

export default TrainingGeneralInformations
