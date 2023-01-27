import {TextField} from "@mui/material"
import * as React from "react"

interface Props {
    id: string
    label: string
    defaultValue?: string
    autoFocus?: boolean
    disabled?: boolean
    onChange?: (email: string) => void
}

const CustomTextField = ({id, label, defaultValue, autoFocus = false, disabled = false, onChange}: Props) => {
    return <TextField
        fullWidth
        required
        margin="normal"
        type="text"
        defaultValue={defaultValue}
        name={id}
        label={label}
        autoComplete={id}
        autoFocus={autoFocus}
        disabled={disabled}
        onChange={
            (event: any) =>
                onChange(event.target.value)
        }
    />
}

export default CustomTextField