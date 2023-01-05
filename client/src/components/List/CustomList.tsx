import * as React from 'react';
import {Children, ReactNode} from 'react';
import List from '@mui/material/List';
import NotesRoundedIcon from '@mui/icons-material/NotesRounded';
import {CircularProgress} from "@mui/material";
import CustomListItem from "./CustomListItem";
import CustomListIcon from "./CustomListIcon";

interface Props {
    loading: boolean;
    children: ReactNode;
}

const CustomList = ({loading, children}: Props) => {
    return <List>
        {
            (loading && <CircularProgress/>)
            || (Children.count(children) === 0 && <CustomListItem
                key={0}
                icon={<CustomListIcon icon={<NotesRoundedIcon/>}/>}
                text={'No data'}
            />)
            || children
        }
    </List>
}


export default CustomList