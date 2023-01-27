import * as React from 'react'
import {useState} from 'react'
import Avatar from '@mui/material/Avatar'
import Button from '@mui/material/Button'
import TextField from '@mui/material/TextField'
import Grid from '@mui/material/Grid'
import Box from '@mui/material/Box'
import LockOutlinedIcon from '@mui/icons-material/LockOutlined'
import Typography from '@mui/material/Typography'
import Container from '@mui/material/Container'
import axios, {AxiosError, AxiosResponse} from "axios"
import {getJSONFromForm} from "../../utils/forms"
import {Link} from "react-router-dom"
import CustomForm from "../Form/CustomForm"
import CustomTextField from "../Form/Fields/CustomTextField"
import EmailField from "../Form/Fields/EmailField"
import PasswordField from "../Form/Fields/PasswordField"
import {signUp} from "../../services/users.service"

interface ISignUp {
    first_name: string
    last_name: string
    email: string
    password: string
}

const SignUp = () => {
    const [message, setMessage] = useState('')

    const handleSubmit = (data: ISignUp) => {

        signUp(data)
            .then(() => {
                window.location.href = '/signin'
            })
            .catch((error: AxiosError) => {
                setMessage(error.response.statusText + ' : ' + error.response.data)
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
                <Avatar sx={{m: 1, bgcolor: 'secondary.main'}}>
                    <LockOutlinedIcon/>
                </Avatar>
                <Typography component="h1" variant="h5">
                    Sign up
                </Typography>
                <Typography component="p" color={'red'}>
                    {message}
                </Typography>
                <CustomForm
                    fields={[
                        <CustomTextField id="first_name" label="First Name"/>,
                        <CustomTextField id="last_name" label="Last Name"/>,
                        <EmailField id="email"/>,
                        <PasswordField id="password"/>
                    ]}
                    onSubmit={handleSubmit}
                />
                <Grid container justifyContent="flex-end">
                    <Grid item>
                        <Link to={'/signin'}>Already have an account? Sign in</Link>
                    </Grid>
                </Grid>
            </Box>
        </Container>
    )
}

export default SignUp
