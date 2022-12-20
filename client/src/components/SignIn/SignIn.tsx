import * as React from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import {Link} from "react-router-dom";
import {AxiosError} from "axios";
import {FormEvent, useState} from "react";
import {getJSONFromForm} from "../../utils/forms";
import {signIn} from "../../services/users.service";
import Message from "../Message/Message";
import {Alert, AlertColor, SnackbarOrigin} from "@mui/material";

const SignIn = () => {

    const [message, setMessage] = useState<{
        message: string;
        severity: AlertColor,
        position: SnackbarOrigin
    }>({
        message: '',
        severity: undefined,
        position: {
            vertical: 'top',
            horizontal: 'right'
        }
    })

    const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();

        const data = getJSONFromForm(event.currentTarget)

        if (!data.email && !data.password) {
            setMessage({
                ...message,
                message: 'Merci de renseigner votre adresse e-mail et votre mot de passe.',
                severity: 'warning'
            })
            return
        }

        signIn({
            email: data.email,
            password: data.password
        }).then(() => {
            setMessage({
                ...message,
                message: 'Vous êtes connecté.',
                severity: 'success'
            })
        }).catch((error: AxiosError) => {
            setMessage({
                ...message,
                message: error.response.statusText + ' : ' + error.response.data,
                severity: 'error'
            })
        })
    };

    return (
        <Container component="main" maxWidth="xs">
            <Box
                sx={{
                    marginTop: '2em',
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                }}
            >
                <Avatar>
                    <LockOutlinedIcon/>
                </Avatar>
                <Typography component="h1" variant="h5">
                    Sign in
                </Typography>
                { message.message !== '' &&
                    <Alert elevation={6} variant="filled" severity={message.severity} sx={{width: '100%'}}>
                        {message.message}
                    </Alert>
                }
                <Box component="form" onSubmit={handleSubmit} noValidate sx={{mt: 1}}>
                    <TextField
                        margin="normal"
                        required
                        fullWidth
                        id="email"
                        label="Email Address"
                        name="email"
                        autoComplete="email"
                        autoFocus
                    />
                    <TextField
                        margin="normal"
                        required
                        fullWidth
                        name="password"
                        label="Password"
                        type="password"
                        id="password"
                        autoComplete="current-password"
                    />
                    <Button
                        type="submit"
                        fullWidth
                        variant="contained"
                        sx={{mt: 3, mb: 2}}
                    >
                        Sign In
                    </Button>
                    <Grid container>
                        <Grid item xs>
                            <Link to={'/signup'}>Mot de passe oublié ?</Link>
                        </Grid>
                        <Grid item>
                            <Link to={'/signup'}>Pas de compte ? S'inscrire</Link>
                        </Grid>
                    </Grid>
                </Box>
            </Box>
        </Container>
    );
}

export default SignIn
