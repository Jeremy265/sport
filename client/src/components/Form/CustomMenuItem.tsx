import * as React from "react";
import {ReactElement} from "react";
import {ListItemIcon, ListItemText, MenuItem, Tooltip} from "@mui/material";

interface Props {
    onClick: () => void
    text?: string
    icon?: ReactElement
}

const CustomMenuItem = ({onClick, text, icon}: Props) =>
    <Tooltip title={text}>
        <MenuItem onClick={onClick}>
            <ListItemIcon>
                {icon}
            </ListItemIcon>
            <ListItemText>{text}</ListItemText>
        </MenuItem>
    </Tooltip>


export default CustomMenuItem