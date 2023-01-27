import * as React from 'react'
import {useState} from 'react'
import Avatar from '@mui/material/Avatar'
import Grid from '@mui/material/Grid'
import Box from '@mui/material/Box'
import LockOutlinedIcon from '@mui/icons-material/LockOutlined'
import Typography from '@mui/material/Typography'
import Container from '@mui/material/Container'
import {Link} from "react-router-dom"
import {signIn} from "../../services/users.service"
import {Alert, AlertColor, SnackbarOrigin} from "@mui/material"
import CustomForm from "../Form/CustomForm"
import EmailField from "../Form/Fields/EmailField"
import PasswordField from "../Form/Fields/PasswordField"

interface ISignIn {
    email: string
    password: string
}

const SignIn = () => {

    const [message, setMessage] = useState<{
        message: string
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

    const handleSubmit = (data: ISignIn) => {

        if (!data.email || !data.password) {
            setMessage({
                ...message,
                message: 'Merci de renseigner votre adresse e-mail et votre mot de passe.',
                severity: 'warning'
            })
            return
        }

        signIn(data).then(() => {
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
    }

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
                    <Alert elevation={6}  variant="filled" severity={message.severity} sx={{width: '100%'}}>
                        {message.message}
                    </Alert>
                }
                <CustomForm<ISignIn>
                    submitTitle="Sign in"
                    onSubmit={handleSubmit}
                    fields={[
                        <EmailField
                            id="email"
                        />,
                        <PasswordField
                            id="password"
                        />
                    ]}
                />
                <Grid container>
                    <Grid item xs={12} md={6}>
                        <Link to={'/signup'}>Forgot password ?</Link>
                    </Grid>
                    <Grid item xs={12} md={6}>
                        <Link to={'/signup'}>No account ? Sign up</Link>
                    </Grid>
                </Grid>
            </Box>
        </Container>
    )
}

export default SignIn
