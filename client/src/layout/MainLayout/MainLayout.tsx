import {useDispatch, useSelector} from 'react-redux'
import {Outlet} from 'react-router-dom'
import {styled, useTheme} from '@mui/material/styles'
import {AppBar, Box, CssBaseline, Toolbar, useMediaQuery} from '@mui/material'
import Breadcrumbs from '../../ui-component/extended/Breadcrumbs'
import Header from './Header/Header'
import Sidebar from './Sidebar/Sidebar'
import navigation from '../../menu-items/MenuItems'
import config from '../../config'
import {IconChevronRight} from '@tabler/icons'
import {setOpened} from "../../store/slices/menuSlice";
import Message from "../../ui-component/Message";
import { SnackbarProvider } from 'notistack'

const Main = styled('main', {shouldForwardProp: (prop) => prop !== 'open'})(({theme, open}: any) => ({
    ...theme.typography.mainContent,
    ...(!open && {
        borderBottomLeftRadius: 0,
        borderBottomRightRadius: 0,
        transition: theme.transitions.create('margin', {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.leavingScreen
        }),
        [theme.breakpoints.up('md')]: {
            marginLeft: -(config.drawerWidth - 20),
            width: `calc(100% - ${config.drawerWidth}px)`
        },
        [theme.breakpoints.down('md')]: {
            marginLeft: '20px',
            width: `calc(100% - ${config.drawerWidth}px)`,
            padding: '16px'
        },
        [theme.breakpoints.down('sm')]: {
            marginLeft: '10px',
            width: `calc(100% - ${config.drawerWidth}px)`,
            padding: '16px',
            marginRight: '10px'
        }
    }),
    ...(open && {
        transition: theme.transitions.create('margin', {
            easing: theme.transitions.easing.easeOut,
            duration: theme.transitions.duration.enteringScreen
        }),
        marginLeft: 0,
        borderBottomLeftRadius: 0,
        borderBottomRightRadius: 0,
        width: `calc(100% - ${config.drawerWidth}px)`,
        [theme.breakpoints.down('md')]: {
            marginLeft: '20px'
        },
        [theme.breakpoints.down('sm')]: {
            marginLeft: '10px'
        }
    })
}))

const MainLayout = () => {
    const theme: any = useTheme()
    const matchDownMd = useMediaQuery(theme.breakpoints.down('md'))
    const leftDrawerOpened = useSelector((state: any) => state.menu?.opened)

    const dispatch = useDispatch()

    const handleLeftDrawerToggle = () => {
        dispatch(setOpened(!leftDrawerOpened))
    }

    // @ts-ignore
    // @ts-ignore
    return (
        <Box sx={{display: 'flex'}}>
            <CssBaseline/>
            <AppBar
                enableColorOnDark
                position="fixed"
                color="inherit"
                elevation={0}
                sx={{
                    bgcolor: theme.palette.background.default,
                    transition: leftDrawerOpened ? theme.transitions.create('width') : 'none'
                }}
            >
                <Toolbar>
                    <Header handleLeftDrawerToggle={handleLeftDrawerToggle}/>
                </Toolbar>
            </AppBar>

            <Sidebar drawerOpen={!matchDownMd ? leftDrawerOpened : !leftDrawerOpened}
                     drawerToggle={handleLeftDrawerToggle}/>

            {/*@ts-ignore*/}
            <Main theme={theme} open={leftDrawerOpened}>
                <Breadcrumbs separator={IconChevronRight} navigation={navigation} icon title rightAlign/>
                <SnackbarProvider maxSnack={4} anchorOrigin={{
                    vertical: 'top',
                    horizontal: 'right'
                }}>
                    <Message/>
                </SnackbarProvider>
                <Outlet/>
            </Main>
        </Box>
    )
}

export default MainLayout
