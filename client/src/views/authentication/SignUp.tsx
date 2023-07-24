import {ChangeEvent, useState} from 'react'
import {Link, useNavigate} from 'react-router-dom'
import {Box, FormControl, Grid, IconButton, Typography} from '@mui/material'
import * as Yup from 'yup'
import {strengthColor, strengthIndicator} from '../../utils/password-strength'
import Visibility from '@mui/icons-material/Visibility'
import VisibilityOff from '@mui/icons-material/VisibilityOff'
import values from '../../assets/scss/_themes-vars.module.scss'
import CustomForm from "../../ui-component/forms/customforms/CustomForm";
import {IUser, signUp} from "../../services/users.service";
import CustomFormInput from "../../ui-component/forms/customfields/CustomFormInput";
import MainCard from "../../ui-component/cards/MainCard";
import config from "../../config";
import {setMessage} from "../../store/slices/messageSlice";
import {useDispatch} from "react-redux";

const SignUp = () => {
    const dispatch = useDispatch()
    const navigate = useNavigate()

    const [showPassword, setShowPassword] = useState(false)

    const handleClickShowPassword = () => {
        setShowPassword(!showPassword)
    }
    const [strength, setStrength] = useState(0)
    const [level, setLevel] = useState({label: 'Poor', color: values.errorMain})

    const changePassword = (e: ChangeEvent<HTMLInputElement>) => {
        const temp = strengthIndicator(e.target.value)
        setStrength(temp)
        setLevel(strengthColor(temp))
    }

    const handleSignUp = (_: IUser) => {
        dispatch(setMessage({text: 'You have signed up successfully ! You can now sign in.', severity: 'success'}))
        navigate(config.defaultPath + 'signin')
    }

    return <MainCard title="Sign In">
        <CustomForm<IUser>
            initialValues={{
                first_name: '',
                last_name: '',
                email: '',
                password: ''
            }}
            validationSchema={Yup.object().shape({
                first_name: Yup.string().max(45).required('First name is required'),
                last_name: Yup.string().max(45).required('Last name is required'),
                email: Yup.string().email('Must be a valid email').max(100).required('Email is required'),
                password: Yup.string().max(100).required('Password is required')
            })}
            handleSubmit={signUp}
            messageOnResponseOk="You have signed up successfully !"
            handleResponse={handleSignUp}>
            <CustomFormInput
                id="first_name"
                label="First name"
            />
            <CustomFormInput
                id="last_name"
                label="Last name"
            />
            <CustomFormInput
                id="email"
                type="email"
                label="Email Address"
            />
            <CustomFormInput
                id="password"
                label="Password"
                type={showPassword ? 'text' : 'password'}
                onChange={changePassword}
                endAdornment={<IconButton
                    aria-label="toggle password visibility"
                    onClick={handleClickShowPassword}
                    edge="end"
                    size="large"
                >
                    {showPassword ? <Visibility/> : <VisibilityOff/>}
                </IconButton>
                }
            />
        </CustomForm>
        {
            strength !== 0 && (
                <FormControl fullWidth>
                    <Box sx={{mb: 2}}>
                        <Grid container spacing={2} alignItems="center">
                            <Grid item>
                                <Box
                                    style={{backgroundColor: level?.color}}
                                    sx={{width: 85, height: 8, borderRadius: '7px'}}
                                />
                            </Grid>
                            <Grid item>
                                <Typography variant="subtitle1" fontSize="0.75rem">
                                    {level?.label}
                                </Typography>
                            </Grid>
                        </Grid>
                    </Box>
                </FormControl>
            )
        }
        <Link to={config.defaultPath + 'signin'} style={{marginTop: '10px', float: 'right'}}>
            <Typography variant="body1">
                Already have an account ? Sign in
            </Typography>
        </Link>
    </MainCard>
}

export default SignUp
