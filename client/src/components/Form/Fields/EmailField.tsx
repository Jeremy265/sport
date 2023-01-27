import {TextField} from "@mui/material"
import * as React from "react"

interface Props {
    id: string
    onChange?: (email: string) => void
}

const EmailField = ({onChange}: Props) => {
    return <TextField
        fullWidth
        required
        margin="normal"
        type="text"
        name="email"
        label="Email"
        autoComplete="email"
        onChange={
            (event: any) => {
                if (onChange)
                    onChange(event.target.value)
            }

        }
    />
}

export default EmailField