import * as React from 'react'
import {ReactElement} from 'react'
import ListItem from '@mui/material/ListItem'
import ListItemText from '@mui/material/ListItemText'
import CustomMenu from "../menu/CustomMenu";
import CustomMenuItem from "../menu/CustomMenuItem";
import DeleteIcon from "@mui/icons-material/Delete"
import CreateRoundedIcon from '@mui/icons-material/CreateRounded'
import config from "../../config";
import {ListItemButton, ListItemIcon} from "@mui/material";

interface Props {
    icon: ReactElement
    text: string | ReactElement
    onClick?: () => void
    onUpdate?: () => void
    onDelete?: () => void
}

const CustomListItem = ({icon, text, onClick, onUpdate, onDelete}: Props) => {

    return (
        onClick
            ? <ListItemButton
                sx={{borderRadius: `${config.borderRadius}px`}}
                onClick={onClick}
            >
                <ListItemIcon>
                    {icon}
                </ListItemIcon>
                <ListItemText
                    primary={text}
                />
            </ListItemButton>
            : <ListItem
                secondaryAction={
                    (onUpdate || onDelete) &&
                    <CustomMenu>
                        {onUpdate && <CustomMenuItem onClick={onUpdate} text="Update" icon={<CreateRoundedIcon/>}/>}
                        {onDelete && <CustomMenuItem onClick={onDelete} text="Delete" icon={<DeleteIcon/>}/>}
                    </CustomMenu>
                }
            >
                <ListItemIcon>
                    {icon}
                </ListItemIcon>
                <ListItemText
                    primary={text}
                />
            </ListItem>
    )
}

export default CustomListItem