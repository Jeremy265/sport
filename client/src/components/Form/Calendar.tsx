import * as React from "react";
import {useState} from "react";
import {CalendarPicker, LocalizationProvider, PickersDay, PickersDayProps} from "@mui/x-date-pickers";
import {AdapterDayjs} from "@mui/x-date-pickers/AdapterDayjs";
import {Badge} from "@mui/material";
import 'dayjs/locale/fr';

const dayjs = require("dayjs");

interface Props {
    onChange: (date: Date) => void;
    defaultDate?: Date;
    datesToHighlight?: Set<string>;
}

const Calendar = ({onChange, defaultDate = new Date(), datesToHighlight = new Set()}: Props) => {
    const [date, setDate] = useState<Date>(dayjs(defaultDate))

    const renderDay = (date: Date, selectedDates: Date[], pickersDayProps: PickersDayProps<Date>) =>
        <Badge
            key={pickersDayProps.key}
            color="primary"
            overlap="circular"
            variant="dot"
            invisible={
                !datesToHighlight.has(dayjs(date).format("DD/MM/YYYY"))
            }
        >
            <PickersDay {...pickersDayProps}/>
        </Badge>

    return <LocalizationProvider dateAdapter={AdapterDayjs} adapterLocale={'fr'}>
        <CalendarPicker
            renderDay={renderDay}
            date={date}
            onChange={(date: Date) => {
                setDate(date)
                onChange(date)
            }}/>
    </LocalizationProvider>
}

export default Calendar