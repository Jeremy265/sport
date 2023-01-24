import * as React from 'react';
import {ReactElement} from 'react';
import ListItem from '@mui/material/ListItem';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import ListItemText from '@mui/material/ListItemText';
import Delete from "../Form/Delete";
import Update from "../Form/Update";

interface Props {
    icon: ReactElement;
    text: string | ReactElement;
    onUpdate?: () => void;
    onDelete?: () => void;
}

const CustomListItem = ({icon, text, onUpdate, onDelete}: Props) => {
    return (
        <ListItem
            secondaryAction={
                <>
                    {
                        onUpdate ? <Update onUpdate={onUpdate}/> : ''
                    }
                    {
                        onDelete ? <Delete onDelete={onDelete}/> : ''
                    }
                </>

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