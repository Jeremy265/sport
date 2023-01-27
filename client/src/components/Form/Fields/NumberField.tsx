import * as React from "react"
import {useState} from "react"
import {IconButton, InputAdornment, TextField} from "@mui/material"
import {Visibility, VisibilityOff} from "@mui/icons-material"

interface Props {
    id: string
    label: string
    defaultValue?: number
    disabled?: boolean
    onChange?: (number: number) => void
    unit?: string
}

const NumberField = ({label, defaultValue, disabled, onChange, unit}: Props) => {

    return <TextField
        fullWidth
        required
        margin="normal"
        type="number"
        inputMode="numeric"
        name="number"
        defaultValue={defaultValue}
        disabled={disabled}
        label={label}
        onChange={
            (event: any) => {
                if (onChange)
                    onChange(event.target.value)
            }
        }
        InputProps={
            unit ?
                {
                    endAdornment: <InputAdornment position="end">
                        {unit}
                    </InputAdornment>
                }
                : {}
        }
    />
}

export default NumberField