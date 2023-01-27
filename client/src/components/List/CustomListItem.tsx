import * as React from 'react'
import {ReactElement} from 'react'
import ListItem from '@mui/material/ListItem'
import ListItemAvatar from '@mui/material/ListItemAvatar'
import ListItemText from '@mui/material/ListItemText'
import CustomMenu from "../Form/CustomMenu";
import CustomMenuItem from "../Form/CustomMenuItem";
import DeleteIcon from "@mui/icons-material/Delete"
import CreateRoundedIcon from '@mui/icons-material/CreateRounded'

interface Props {
    icon: ReactElement
    text: string | ReactElement
    onUpdate?: () => void
    onDelete?: () => void
}

const CustomListItem = ({icon, text, onUpdate, onDelete}: Props) => {

    return (
        <ListItem
            secondaryAction={
                <CustomMenu>
                    {onUpdate && <CustomMenuItem onClick={onUpdate} text="Update" icon={<CreateRoundedIcon/>}/>}
                    {onDelete && <CustomMenuItem onClick={onDelete} text="Delete" icon={<DeleteIcon/>}/>}
                </CustomMenu>
            }
        >
            <ListItemAvatar>
                {icon}
            </ListItemAvatar>
            <ListItemText
                primary={text}
            />
        </ListItem>
    )
}

export default CustomListItem