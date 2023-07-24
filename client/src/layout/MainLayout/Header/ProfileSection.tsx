import {useNavigate} from 'react-router-dom'
import {useTheme} from '@mui/material/styles'
import {Box, Divider, Stack, Typography} from '@mui/material'
import {IconChevronDown, IconLogin, IconLogout, IconSettings, IconUserCircle} from '@tabler/icons'
import {IUser} from "../../../services/users.service";
import {useDispatch, useSelector} from "react-redux";
import {IRootState} from "../../../index";
import {signOutUser} from "../../../store/slices/userSlice";
import CustomList from "../../../ui-component/lists/CustomList";
import CustomListItem from "../../../ui-component/lists/CustomListItem";
import CustomPopper from "../../../ui-component/popper/popper";
import MainCard from "../../../ui-component/cards/MainCard";
import config from "../../../config";
import {setMessage} from "../../../store/slices/messageSlice";

const ProfileSection = () => {
    const theme: any = useTheme()
    const user: IUser = useSelector((state: IRootState) => state.user)
    const dispatch = useDispatch()
    const navigate = useNavigate()

    const handleSignOut = () => {
        dispatch(signOutUser())
        console.log('la')
        dispatch(setMessage({text: 'You have signed out successfully !', severity: 'success'}))
        handleSignIn()
    }

    const handleSignIn = () => {
        navigate(config.defaultPath + 'signin')
    }

    const handleAccountSettings = () => {
        navigate(config.defaultPath)
    }

    return (
        <CustomPopper
            icon={<IconUserCircle/>}
            text={<IconChevronDown/>}>
            <Box
                component="nav"
                sx={{
                    width: '100%',
                    maxWidth: 350,
                    minWidth: 300,
                    backgroundColor: theme.palette.background.paper,
                    borderRadius: '10px',
                    [theme.breakpoints.down('md')]: {
                        minWidth: '100%'
                    }
                }}
            >
                <MainCard shadow title={`Hi, ${user.token ? `${user.first_name} ${user.last_name}` : 'please sign in'}`}>
                    <CustomList>
                        {
                            user.token
                                ? <>
                                    <CustomListItem icon={<IconSettings stroke={1.5}/>}
                                                    text={<Typography variant="body2">Account
                                                        Settings</Typography>}
                                                    onClick={handleAccountSettings}/>
                                    <CustomListItem icon={<IconLogout stroke={1.5}/>}
                                                    text={<Typography variant="body2">Sign Out</Typography>}
                                                    onClick={handleSignOut}/>
                                </>
                                : <CustomListItem
                                    icon={<IconLogin stroke={1.5}/>}
                                    text={<Typography variant="body2">Sign
                                        In</Typography>}
                                    onClick={handleSignIn}
                                />
                        }
                    </CustomList>
                </MainCard>
            </Box>
        </CustomPopper>
    )
}

export default ProfileSection
