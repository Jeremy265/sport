import * as React from 'react';
import {Alert, Snackbar, AlertColor, SnackbarOrigin, IconButton} from "@mui/material";
import CloseIcon from '@mui/icons-material/Close';
import {SyntheticEvent, useState} from "react";

interface Props {
    message: string;
    severity: AlertColor;
    position: SnackbarOrigin;
}

const Message = ({message, severity, position}: Props) => {

    const [open, setOpen] = useState(true);

    setOpen(true)

    const handleClose = (event: SyntheticEvent | Event, reason?: string) => {
        if (reason === 'clickaway') {
            return;
        }

        setOpen(false);
    };

    const action = (
        <IconButton
            size="small"
            aria-label="close"
            color="inherit"
            onClick={handleClose}
        >
            <CloseIcon fontSize="small" />
        </IconButton>
    )

    return <Snackbar anchorOrigin={position} open={open} onClose={handleClose} autoHideDuration={6000} action={action}>
        <Alert elevation={6} variant="filled" onClose={handleClose} severity={severity} sx={{width: '100%'}}>
            {message}
        </Alert>
    </Snackbar>

}

export default Message
