import * as React from 'react'
import {useState} from 'react'
import {TextField, TextFieldProps} from "@mui/material"
import {Dayjs} from "dayjs"
import {AdapterDayjs} from "@mui/x-date-pickers/AdapterDayjs"
import {DatePicker, LocalizationProvider} from "@mui/x-date-pickers"
import 'dayjs/locale/fr'
import {getFormattedDate} from "../../../utils/utils"

interface Props {
    id: string
    onChange?: (date: Date) => void
    defaultValue?: Date
}

const dayjs = require('dayjs')

const DateField = ({onChange, defaultValue = new Date}: Props) => {
    const [date, setDate] = useState<Dayjs>(dayjs(defaultValue))

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
            renderInput={(params: TextFieldProps) => <TextField required {...params} />}
        />
    </LocalizationProvider>
}

export default DateField