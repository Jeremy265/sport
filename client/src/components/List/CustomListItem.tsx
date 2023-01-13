import * as React from 'react';
import {ReactElement} from 'react';
import ListItem from '@mui/material/ListItem';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import ListItemText from '@mui/material/ListItemText';
import Delete from "../Form/Delete";

interface Props {
    icon: ReactElement;
    text: string | ReactElement;
    onDelete?: () => void;
}

const CustomListItem = ({icon, text, onDelete}: Props) => {
    return (
        <ListItem
            secondaryAction={
                onDelete ? <Delete onDelete={onDelete}/> : ''
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