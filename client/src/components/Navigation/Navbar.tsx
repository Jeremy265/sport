import React = require("react");
import DashboardIcon from '@mui/icons-material/Dashboard';
import LoginIcon from '@mui/icons-material/Login';
import LogoutIcon from '@mui/icons-material/Logout';
import AdminPanelSettingsIcon from '@mui/icons-material/AdminPanelSettings';
import FitnessCenterIcon from '@mui/icons-material/FitnessCenter';
import {List, ListItemButton, ListItemIcon, ListItemText,} from "@mui/material";
import {useState} from "react";
import NavbarItem from "./NavbarItem";
import {signOut} from "../../services/users.service";

interface Menu {
    path: string;
    text: string;
    icon: any;
    mustNotBeLogged: boolean;
    mustBeLogged: boolean;
    mustBeAdmin: boolean;
}

const Navbar = () => {
    const menus: Menu[] = [
        {
            path: '/',
            text: 'Dashboard',
            icon: <DashboardIcon/>,
            mustNotBeLogged: false,
            mustBeLogged: true,
            mustBeAdmin: false
        },
        {
            path: '/training',
            text: 'Mode entraînement',
            icon: <FitnessCenterIcon/>,
            mustNotBeLogged: false,
            mustBeLogged: true,
            mustBeAdmin: false
        },
        {
            path: '/signin',
            text: 'Se connecter',
            icon: <LoginIcon/>,
            mustNotBeLogged: true,
            mustBeLogged: false,
            mustBeAdmin: false
        },
        {
            path: '/admin',
            text: 'Admin',
            icon: <AdminPanelSettingsIcon/>,
            mustNotBeLogged: false,
            mustBeLogged: true,
            mustBeAdmin: true
        },
    ]

    const [selectedMenu, setSelectedMenu] = useState(0)

    const handleSignOut = () => {
        signOut()
    }

    let user: any = undefined
    try {
        user = JSON.parse(localStorage.getItem('user'))
    } catch {
        user = undefined
    }

    return (
        <List sx={{display: 'flex'}}>
            {
                menus.map((menu: Menu, index: number) => {
                    if (menu.mustNotBeLogged && user)
                        return
                    if (menu.mustBeLogged && !user)
                        return
                    if (menu.mustBeAdmin && (!user.isAdmin && user.email !== 'jeremy.thom26@yahoo.fr'))
                        return
                    return <NavbarItem
                        key={index}
                        selected={index === selectedMenu}
                        onClick={() => setSelectedMenu(index)}
                        path={menu.path}
                        text={menu.text}
                        icon={menu.icon}
                    />
                })
            }
            {
                user && <ListItemButton
                    onClick={handleSignOut}
                >
                    <ListItemIcon style={{color: '#FFF', minWidth: '30px'}}>
                        <LogoutIcon/>
                    </ListItemIcon>
                    <ListItemText primary='Se déconnecter'/>
                </ListItemButton>
            }
        </List>
    )
}

export default Navbar
