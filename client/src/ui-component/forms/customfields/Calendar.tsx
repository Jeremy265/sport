import * as React from "react"
import {useState} from "react"
import {CalendarPicker, LocalizationProvider, PickersDay, PickersDayProps} from "@mui/x-date-pickers"
import {AdapterDayjs} from "@mui/x-date-pickers/AdapterDayjs"
import {Badge} from "@mui/material"
import 'dayjs/locale/fr'

const dayjs = require("dayjs")

interface Props {
    onChange: (date: Date) => void
    defaultDate?: Date
    datesToHighlight?: string[]
}

const Calendar = ({onChange, defaultDate = new Date(), datesToHighlight = []}: Props) => {
    const [date, setDate] = useState<Date>(dayjs(defaultDate))

    const renderDay = (date: Date, selectedDates: Date[], pickersDayProps: PickersDayProps<Date>) => {
        if (!datesToHighlight.includes(dayjs(date).format("DD/MM/YYYY")))
            return <PickersDay {...pickersDayProps}/>
        return <Badge
            key={pickersDayProps.key}
            color="primary"
            overlap="circular"
            variant="dot"
        >
            <PickersDay {...pickersDayProps}/>
        </Badge>
    }


    return <LocalizationProvider dateAdapter={AdapterDayjs} adapterLocale={'fr'}>
        <CalendarPicker
            className="w-100"
            renderDay={renderDay}
            date={date}
            onChange={(date: Date) => {
                setDate(date)
                onChange(date)
            }}/>
    </LocalizationProvider>
}

export default Calendar