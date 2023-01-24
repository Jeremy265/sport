import * as React from 'react';
import {FormEvent, useState} from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import {Link} from "react-router-dom";
import {getJSONFromForm} from "../../utils/forms";
import {signIn} from "../../services/users.service";
import {Alert, AlertColor, IconButton, InputAdornment, SnackbarOrigin} from "@mui/material";
import {Visibility, VisibilityOff} from "@mui/icons-material";

const SignIn = () => {

    const [showPassword, setShowPassword] = useState<boolean>(false)

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
            window.location.href = '/'
        }).catch((error: Error) => {
            setMessage({
                ...message,
                message: error.message,
                severity: 'error'
            })
        })
    };

    return (
        <Container maxWidth="xs">
            <Box
                sx={{
                    marginTop: 8,
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
                {message.message !== '' &&
                    <Alert elevation={6} variant="filled" severity={message.severity} sx={{width: '100%'}}>
                        {message.message}
                    </Alert>
                }
                <Box component="form" onSubmit={handleSubmit} sx={{mt: 1}}>
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
                        type={showPassword ? "text" : "password"}
                        id="password"
                        autoComplete="current-password"
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
                            <Link to={'/signup'}>Forgot password ?</Link>
                        </Grid>
                        <Grid item>
                            <Link to={'/signup'}>No account ? Sign up</Link>
                        </Grid>
                    </Grid>
                </Box>
            </Box>
        </Container>
    );
}

export default SignIn
