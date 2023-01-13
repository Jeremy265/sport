import React = require("react");
import Typography from "@mui/material/Typography";
import Toolbar from "@mui/material/Toolbar";
import {AppBar, Box} from "@mui/material";
import {useEffect, useState} from "react";
import Navbar from "../Navigation/Navbar";

const dayjs = require("dayjs")

function getCurrentTime(): string {
    return dayjs(new Date()).format('H:mm:ss');
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
                <Typography variant="h6" component="div">
                    {time}
                </Typography>
                <Toolbar sx={{display: 'flex', justifyContent: 'space-between'}}>
                    <Navbar/>
                </Toolbar>
            </AppBar>
        </Box>
    )
}

export default Header
