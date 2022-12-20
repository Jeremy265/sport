import React = require("react")
import Typography from "@mui/material/Typography";
import Toolbar from "@mui/material/Toolbar";
import {AppBar, Box, IconButton} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import {useEffect, useState} from "react";
import Navbar from "../Navigation/Navbar";
import {Link} from "react-router-dom";

function getCurrentTime(): string {
    const date = new Date();
    return date.toLocaleTimeString();
}

const Header = () => {
    const [time, setTime] = useState(getCurrentTime());

    useEffect(() => {
        const interval = setInterval(() => {
            setTime(getCurrentTime());
        }, 1000);

        return () => clearInterval(interval);
    }, []);

    return (
        <Box sx={{ flexGrow: 1 }}>
            <AppBar position="static">
                <Toolbar sx={{display: 'flex', justifyContent: 'space-between'}}>
                    <Typography variant="h6" component="div">
                        <IconButton
                            size="large"
                            edge="start"
                            color="inherit"
                            aria-label="menu"
                            sx={{ mr: 2 }}
                        >
                            <MenuIcon />
                        </IconButton>
                        <Link to={'/'} style={{color: '#FFF', textDecoration: 'none'}}>Les Sportifs !</Link>
                    </Typography>
                    <Navbar/>
                    <Typography variant="h6" component="div">
                        {time}
                    </Typography>
                </Toolbar>
            </AppBar>
        </Box>
    )
}

export default Header
