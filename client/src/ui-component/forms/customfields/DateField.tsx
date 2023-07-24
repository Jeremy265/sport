import * as React from 'react'
import {useState} from 'react'
import {TextField, TextFieldProps} from "@mui/material"
import {Dayjs} from "dayjs"
import {AdapterDayjs} from "@mui/x-date-pickers/AdapterDayjs"
import {DatePicker, LocalizationProvider} from "@mui/x-date-pickers"
import 'dayjs/locale/fr'

interface Props {
    id: string
    value?: Date
    onChange?: (date: Date) => void
    error?: boolean
    helperText?: string
    onBlur?: () => void
}

const dayjs = require('dayjs')

const DateField = ({value = new Date, onChange, error, helperText, onBlur}: Props) => {
    const [date, setDate] = useState<Dayjs>(dayjs(value))

    return <LocalizationProvider dateAdapter={AdapterDayjs} adapterLocale={'fr'}>
        <DatePicker
            label="Date"
            value={date}
            onChange={
                (date: Date) => {
                    setDate(dayjs(date))
                    if (onChange)
                        onChange(date)
                }
            }
            renderInput={
                (params: TextFieldProps) =>
                    <TextField error={error} helperText={helperText} onBlur={onBlur} variant="standard" margin="normal" required {...params} />
            }
        />
    </LocalizationProvider>
}

export default DateField