import * as React from 'react';
import {useState} from 'react';
import {Container, Grid, Paper, TextFieldProps} from "@mui/material";
import Orders from "../Orders/Orders";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Title from "../Title/Title";
import {DatePicker, LocalizationProvider} from "@mui/x-date-pickers";
import {AdapterDayjs} from "@mui/x-date-pickers/AdapterDayjs";
import {Dayjs} from "dayjs";
import 'dayjs/locale/fr';

const dayjs = require("dayjs");

const TrainingGeneralInformations = () => {

    const [date, setDate] = useState<Dayjs>(dayjs(new Date()))

    const handleSubmit = () => {

    }

    return <Paper sx={{p: 2}}>
        <Title>General informations</Title>
        <Grid container xs={12} spacing={3}>
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
            <Grid item xs={12}>
                <Button
                    type="button"
                    onClick={handleSubmit}
                    fullWidth
                    variant="contained"
                >
                    Save
                </Button>
            </Grid>
        </Grid>
    </Paper>
}

export default TrainingGeneralInformations
