import React = require("react")
import DashboardIcon from '@mui/icons-material/Dashboard'
import LoginIcon from '@mui/icons-material/Login'
import LogoutIcon from '@mui/icons-material/Logout'
import FitnessCenterIcon from '@mui/icons-material/FitnessCenter'
import ScaleRoundedIcon from '@mui/icons-material/ScaleRounded'
import {List,} from "@mui/material"
import {useState} from "react"
import NavbarItem from "./NavbarItem"
import {signOut} from "../../services/users.service"

interface Menu {
    path: string
    text: string
    icon: any
    mustNotBeLogged: boolean
    mustBeLogged: boolean
    action?: () => void
}

const Navbar = () => {
    const menus: Menu[] = [
        {
            path: '/',
            text: 'Les Sportifs !',
            icon: '',
            mustNotBeLogged: false,
            mustBeLogged: false
        },
        {
            path: '/',
            text: 'Dashboard',
            icon: <DashboardIcon/>,
            mustNotBeLogged: false,
            mustBeLogged: true
        },
        {
            path: '/training',
            text: 'Training mode',
            icon: <FitnessCenterIcon/>,
            mustNotBeLogged: false,
            mustBeLogged: true
        },
        {
            path: '/body',
            text: 'My body',
            icon: <ScaleRoundedIcon/>,
            mustNotBeLogged: false,
            mustBeLogged: true,
        },
        {
            path: '/signin',
            text: 'Sign in',
            icon: <LoginIcon/>,
            mustNotBeLogged: true,
            mustBeLogged: false
        },
        {
            path: '/',
            text: 'Sign out',
            icon: <LogoutIcon/>,
            mustNotBeLogged: false,
            mustBeLogged: true,
            action: signOut
        },
    ]

    const [selectedMenu, setSelectedMenu] = useState(0)

    let user: any = undefined
    try {
        user = JSON.parse(localStorage.getItem('user'))
    } catch {
        user = undefined
    }

    return (
        <List sx={{display: 'flex', flexWrap: 'wrap', width:'100vw'}}>
            {
                menus.map((menu: Menu, index: number) => {
                    if (menu.mustNotBeLogged && user)
                        return
                    if (menu.mustBeLogged && !user)
                        return
                    return <NavbarItem
                        key={index}
                        selected={index === selectedMenu}
                        onClick={() => {
                            setSelectedMenu(index)
                            if(menu.action)
                                menu.action()
                        }}
                        path={menu.path}
                        text={menu.text}
                        icon={menu.icon}
                    />
                })
            }
        </List>
    )
}

export default Navbar
