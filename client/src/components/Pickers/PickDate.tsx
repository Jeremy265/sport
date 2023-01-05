import * as React from 'react';
import {useEffect, useState} from 'react';
import {TextField, TextFieldProps} from "@mui/material";
import {Dayjs} from "dayjs";
import {AdapterDayjs} from "@mui/x-date-pickers/AdapterDayjs";
import {DatePicker, LocalizationProvider} from "@mui/x-date-pickers";
import 'dayjs/locale/fr';

interface Props {
    defaultDate?: Date;
    onChange: (date: Date) => void;
}

const dayjs = require('dayjs')

const PickDate = ({defaultDate, onChange}: Props) => {
    const [date, setDate] = useState<Dayjs>(defaultDate ? dayjs(defaultDate) : dayjs(new Date()))

    useEffect(() => {
        onChange(date.toDate())
    }, [date])

    return <LocalizationProvider dateAdapter={AdapterDayjs} adapterLocale={'fr'}>
        <DatePicker
            label="Date"
            value={date}
            onChange={
                (date: Date) =>
                    setDate(dayjs(date))
            }
            renderInput={(params: TextFieldProps) => <TextField required {...params} />}
        />
    </LocalizationProvider>
}

export default PickDate