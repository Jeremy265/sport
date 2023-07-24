import * as React from "react"
import {InputAdornment, TextField} from "@mui/material"
import {ReactElement} from "react";

interface Props {
    id: string
    label: string
    value?: any
    type?: 'text' | 'number' | 'email' | 'password'
    inputMode?: 'text' | 'numeric' | 'decimal' | 'email'
    disabled?: boolean
    onChange?: (_: any) => void
    endAdornment?: string | ReactElement
    error?: boolean
    helperText?: string
    onBlur?: () => void
}

const CustomFormInput = ({id, label, value, type = 'text', inputMode = 'text', disabled, onChange, endAdornment, error = false, helperText = '', onBlur}: Props) => {

    return <TextField
        fullWidth
        defaultValue={value}
        error={error}
        helperText={helperText}
        id={id}
        name={id}
        label={label}
        disabled={disabled}
        margin="normal"
        variant="standard"
        type={type}
        inputMode={inputMode}
        onChange={onChange}
        onBlur={onBlur}
        InputProps={
            endAdornment ?
                {
                    endAdornment: <InputAdornment position="end">
                        {endAdornment}
                    </InputAdornment>
                }
                : {}
        }
    />
}

export default CustomFormInput