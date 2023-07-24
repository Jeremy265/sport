import * as React from 'react'
import {ReactElement} from 'react'
import {Avatar} from "@mui/material"
import {FitnessCenterRounded} from "@mui/icons-material"

interface Props {
    icon?: ReactElement
    src?: string
    alt?: string
}

const CustomListIcon = ({icon, src, alt}: Props) =>
    <Avatar sx={{'&.MuiAvatar-root': {background: 'none'}}} src={src} alt={alt}>
        {
            icon ? icon : <FitnessCenterRounded/>
        }
    </Avatar>

export default CustomListIcon