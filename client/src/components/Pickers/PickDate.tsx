import * as React from 'react';
import {useState} from 'react';
import {TextField, TextFieldProps} from "@mui/material";
import {Dayjs} from "dayjs";
import {AdapterDayjs} from "@mui/x-date-pickers/AdapterDayjs";
import {DatePicker, LocalizationProvider} from "@mui/x-date-pickers";
import 'dayjs/locale/fr';

interface Props {
    onChange: (date: Date) => void;
    defaultDate?: Date;
}

const dayjs = require('dayjs')

const PickDate = ({onChange, defaultDate = new Date}: Props) => {
    const [date, setDate] = useState<Dayjs>(dayjs(defaultDate))

    return <LocalizationProvider dateAdapter={AdapterDayjs} adapterLocale={'fr'}>
        <DatePicker
            label="Date"
            value={date}
            onChange={
                (date: Date) => {
                    setDate(dayjs(date))
                    onChange(date)
                }
            }
            renderInput={(params: TextFieldProps) => <TextField required {...params} />}
        />
    </LocalizationProvider>
}

export default PickDate