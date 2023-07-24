import {useState} from 'react'
import {IconButton, InputAdornment, OutlinedInput, Typography} from '@mui/material'
import Visibility from '@mui/icons-material/Visibility'
import VisibilityOff from '@mui/icons-material/VisibilityOff'
import CustomForm from "../../ui-component/forms/customforms/CustomForm"
import * as Yup from "yup";
import {IUser, signIn} from "../../services/users.service";
import {useDispatch} from "react-redux";
import {signInUser} from "../../store/slices/userSlice";
import {Link, useNavigate} from "react-router-dom";
import CustomFormInput from "../../ui-component/forms/customfields/CustomFormInput";
import MainCard from "../../ui-component/cards/MainCard";
import config from "../../config";
import {setMessage} from "../../store/slices/messageSlice";

const SingIn = () => {
    const dispatch = useDispatch()
    const navigate = useNavigate()

    const [showPassword, setShowPassword] = useState(false)

    const handleClickShowPassword = () => {
        setShowPassword(!showPassword)
    }

    const handleSignIn = (response: IUser) => {
        dispatch(signInUser(response))
        navigate(config.defaultPath)
    }

    return <MainCard title="Sign In">
        <CustomForm<IUser>
            initialValues={{
                email: '',
                password: ''
            }}
            validationSchema={
                Yup.object().shape({
                    email: Yup.string().email('Must be a valid email').max(100).required('Email is required'),
                    password: Yup.string().max(100).required('Password is required')
                })
            }
            handleSubmit={signIn}
            messageOnResponseOk="You have signed in successfully !"
            handleResponse={handleSignIn}
            submitLabel="Sign in"
        >
            <CustomFormInput
                id="email"
                type="email"
                inputMode="email"
                label="Email"
            />
            <CustomFormInput
                id="password"
                label="Password"
                type={showPassword ? 'text' : 'password'}
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
        <Link to={config.defaultPath + 'signup'} style={{marginTop: '10px', float: 'right'}}>
            <Typography variant="body1">
                Don't have an account yet ? Sign up
            </Typography>
        </Link>
    </MainCard>
}

export default SingIn
