import * as React from 'react';
import {useDispatch, useSelector} from "react-redux";
import {IRootState} from "../index";
import {IMessageState, setMessage} from "../store/slices/messageSlice";
import config from "../config";
import {useNavigate} from "react-router-dom";
import { useSnackbar} from 'notistack';
import IconButton from "@mui/material/IconButton";
import CloseRoundedIcon from "@mui/icons-material/CloseRounded";
import {Tooltip} from "@mui/material";
import {useEffect} from "react";

const Message = () => {

    const {enqueueSnackbar, closeSnackbar} = useSnackbar();

    const message: IMessageState = useSelector((state: IRootState) => state.message)
    const dispatch = useDispatch()
    const navigate = useNavigate()

    useEffect(() => {
        if (!message.text)
            return

        enqueueSnackbar(
            message.text,
            {
                variant: message.severity,
                autoHideDuration: config.messageDuration,
                action: (id: string) =>
                    <Tooltip title="Close">
                        <IconButton
                            edge="end"
                            onClick={() => closeSnackbar(id)}
                        >
                            <CloseRoundedIcon sx={{color: 'white'}}/>
                        </IconButton>
                    </Tooltip>
            });

        if (message.redirect)
            navigate(message.redirect)

        if (message.text === 'Forbidden : Wrong token')
            dispatch(setMessage({
                text: 'You must be signed in.',
                severity: 'warning',
                redirect: config.defaultPath + 'signin'
            }))

        setTimeout(() => dispatch(setMessage({text: undefined, severity: undefined})), config.messageDuration)
    }, [message])

    return <></>
}

export default Message