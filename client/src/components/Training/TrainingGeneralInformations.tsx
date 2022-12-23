import * as React from 'react';
import {ChangeEvent, useState} from 'react';
import {Grid, Paper, TextFieldProps} from "@mui/material";
import TextField from "@mui/material/TextField";
import Title from "../Title/Title";
import {DatePicker, LocalizationProvider} from "@mui/x-date-pickers";
import {AdapterDayjs} from "@mui/x-date-pickers/AdapterDayjs";
import {Dayjs} from "dayjs";
import 'dayjs/locale/fr';
import {createTraining, ITraining, updateTraining} from "../../services/trainings.service";
import {AxiosError, AxiosResponse} from "axios";
import Button from "@mui/material/Button";


interface Props {
    training: ITraining;
    onSubmitTraining: (training: ITraining) => void
}

const dayjs = require("dayjs");

const TrainingGeneralInformations = ({training, onSubmitTraining}: Props) => {

    const [date, setDate] = useState<Dayjs>(training ? training.date : dayjs(new Date()))
    const [title, setTitle] = useState<string>(training ? training.title : `My training of ${date.format('DD/MM/YYYY')}`)

    const handleChangeDate = (e: ChangeEvent<HTMLInputElement>) =>
        setDate(dayjs(e.currentTarget.value))

    const handleChangeTitle = (e: ChangeEvent<HTMLInputElement>) =>
        setTitle(e.currentTarget.value)

    const onSubmit = () => {
        if (training) {
            updateTraining({
                training_id: training.training_id,
                title: title,
                date: date.toDate()
            }).then((response: ITraining) => {
                onSubmitTraining(response)
            }).catch((error: AxiosError) => {
                console.log(error)
            })
        } else {
            createTraining({
                title: title,
                date: date.toDate()
            }).then((response: ITraining) => {
                onSubmitTraining(response)
            }).catch((error: AxiosError) => {
                console.log(error)
            })
        }
    }

    return <Paper sx={{p: 2}}>
        <Title>General informations</Title>
        <Grid container spacing={3} component="form">
            <Grid item xs={12} md={3} sx={{mt: 2}}>
                <LocalizationProvider dateAdapter={AdapterDayjs} adapterLocale={'fr'}>
                    <DatePicker
                        label="Training date"
                        value={date}
                        onChange={handleChangeDate}
                        renderInput={(params: TextFieldProps) => <TextField required {...params} />}
                    />
                </LocalizationProvider>
            </Grid>
            <Grid item xs={12} md={9}>
                <TextField
                    margin="normal"
                    required
                    fullWidth
                    id="title"
                    label="Training title"
                    name="title"
                    autoComplete="off"
                    value={title}
                    onChange={handleChangeTitle}
                    autoFocus
                />
            </Grid>
            <Grid item xs={12}>
                <Button
                    type="button"
                    fullWidth
                    variant="contained"
                    onClick={onSubmit}
                >
                    {!training ? 'Start new training' : 'Update'}
                </Button>
            </Grid>
        </Grid>
    </Paper>
}

export default TrainingGeneralInformations
