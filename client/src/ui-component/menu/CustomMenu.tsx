import {IconButton, Menu, MenuList, Tooltip} from "@mui/material";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import * as React from "react";
import {ReactElement} from "react";

interface Props {
    children?: React.ReactNode
    icon?: ReactElement
    tooltip?: string
}

const CustomMenu = ({children, icon = <MoreVertIcon/>, tooltip}: Props) => {
    const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null)
    const open = Boolean(anchorEl)

    const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
        setAnchorEl(event.currentTarget)
    }
    const handleClose = () => {
        setAnchorEl(null)
    }

    return <>
        <Tooltip title={tooltip}>
            <IconButton
                onClick={handleClick}
            >
                {icon}
            </IconButton>
        </Tooltip>
        <Menu
            anchorEl={anchorEl}
            open={open}
            onClose={handleClose}
            MenuListProps={{
                'aria-labelledby': 'basic-button',
            }}
        >
            <MenuList onClick={handleClose}>
                {children}
            </MenuList>
        </Menu>
    </>
}

export default CustomMenu