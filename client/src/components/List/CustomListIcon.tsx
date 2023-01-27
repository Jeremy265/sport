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
    (icon && <Avatar>{icon}</Avatar>) || (src && <Avatar src={src} alt={alt}/>) || <Avatar><FitnessCenterRounded/></Avatar>

export default CustomListIcon