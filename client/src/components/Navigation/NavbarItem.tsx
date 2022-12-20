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
        <Link to={path} style={{color: '#FFF', textDecoration: 'none'}}>
            <ListItemButton
                selected={selected}
                onClick={onClick}
            >
                <ListItemIcon style={{color:'#FFF', minWidth: '30px'}}>
                    {icon}
                </ListItemIcon>
                <ListItemText primary={text}/>
            </ListItemButton>
        </Link>
    )
}

export default NavbarItem
