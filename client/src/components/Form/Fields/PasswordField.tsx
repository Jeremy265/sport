import * as React from "react"
import {useState} from "react"
import {IconButton, InputAdornment, TextField} from "@mui/material"
import {Visibility, VisibilityOff} from "@mui/icons-material"

interface Props {
    id: string
    onChange?: (password: string) => void
}

const PasswordField = ({onChange}: Props) => {
    const [showPassword, setShowPassword] = useState<boolean>(false)

    return <TextField
        fullWidth
        required
        margin="normal"
        type={showPassword ? "text" : "password"}
        name="password"
        label="Password"
        onChange={
            (event: any) => {
                if (onChange)
                    onChange(event.target.value)
            }
        }
        InputProps={
            {
                endAdornment: <InputAdornment position="end">
                    <IconButton
                        aria-label="toggle password visibility"
                        onClick={
                            () =>
                                setShowPassword(!showPassword)
                        }
                    >
                        {showPassword ? <VisibilityOff/> : <Visibility/>}
                    </IconButton>
                </InputAdornment>
            }
        }
    />
}

export default PasswordField