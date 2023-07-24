import {useTheme} from '@mui/material/styles'
import {Avatar, Box, ButtonBase, Stack, Typography, useMediaQuery} from '@mui/material'
import {IconMenu2} from '@tabler/icons'
import {useSelector} from "react-redux";
import {IRootState} from "../../../index";
import {IUser} from "../../../services/users.service";
import ProfileSection from "./ProfileSection";
import LogoSection from "../LogoSection/LogoSection";

interface Props {
    handleLeftDrawerToggle: () => void
}

const Header = ({handleLeftDrawerToggle}: Props) => {
    const theme: any = useTheme()
    const matchDownSM = useMediaQuery(theme.breakpoints.down('md'));

    const user: IUser = useSelector((state: IRootState) => state.user)

    return (
        <Stack direction="row" width="100%" spacing={1.5} alignItems="center" justifyContent="space-between">
            <Box
                sx={{
                    width: 228,
                    display: 'flex',
                    [theme.breakpoints.down('md')]: {
                        width: 'auto'
                    }
                }}
            >
                <Box component="span" sx={{display: {xs: 'none', md: 'block'}, flexGrow: 1}}>
                    <LogoSection/>
                </Box>
                <ButtonBase sx={{borderRadius: '12px', overflow: 'hidden'}}>
                    <Avatar
                        variant="rounded"
                        sx={{
                            ...theme.typography.commonAvatar,
                            ...theme.typography.mediumAvatar,
                            transition: 'all .2s ease-in-out',
                            background: theme.palette.secondary.light,
                            color: theme.palette.secondary.dark,
                            '&:hover': {
                                background: theme.palette.secondary.dark,
                                color: theme.palette.secondary.light
                            }
                        }}
                        onClick={handleLeftDrawerToggle}
                        color="inherit"
                    >
                        <IconMenu2/>
                    </Avatar>
                </ButtonBase>
            </Box>
            <Typography
                color={theme.palette.secondary.main}
                textAlign="center"
                variant={matchDownSM ? 'h3' : 'h2'}
            >
                {
                    user.token
                        ? `Hi, welcome back ${user.first_name} ${user.last_name}`
                        : 'Welcome stranger, sign in'
                }
            </Typography>
            <ProfileSection/>
        </Stack>
    )
}

export default Header
