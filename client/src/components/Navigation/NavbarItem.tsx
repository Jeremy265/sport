import React = require("react");
import {ListItemButton, ListItemIcon, ListItemText,} from "@mui/material";
import {Link} from "react-router-dom";

interface Props {
    selected: boolean;
    onClick: () => void;
    path: string;
    icon: string;
    text: string;
}
const NavbarItem = ({selected, onClick, path, icon, text}: Props) => {
    return (
        <Link to={path} style={{display: 'flex', flexWrap:'wrap', color: '#FFF', textDecoration: 'none', minWidth: '150px'}}>
            <ListItemButton
                selected={selected}
                onClick={onClick}
            >
                <ListItemIcon style={{color:'#FFF', minWidth: '150px'}}>
                    {icon}
                </ListItemIcon>
                <ListItemText primary={text}/>
            </ListItemButton>
        </Link>
    )
}

export default NavbarItem
