import * as React from 'react'
import {Children, ReactNode} from 'react'
import List from '@mui/material/List'
import NotesRoundedIcon from '@mui/icons-material/NotesRounded'
import {CircularProgress} from "@mui/material"
import CustomListItem from "./CustomListItem"
import CustomListIcon from "./CustomListIcon"
import Loading from "../Loading";

interface Props {
    isLoading?: boolean
    children?: ReactNode
}

const CustomList = ({isLoading = false, children}: Props) => {
    return <List>
        <Loading isLoading={isLoading}>
            {
                (Children.count(children) === 0
                    && <CustomListItem
                        key={0}
                        icon={<CustomListIcon icon={<NotesRoundedIcon/>}/>}
                        text={'No data'}/>
                    || children
                )
            }
        </Loading>
    </List>
}


export default CustomList