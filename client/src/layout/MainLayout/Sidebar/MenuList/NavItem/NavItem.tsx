import PropTypes from 'prop-types'
import {forwardRef} from 'react'
import {Link} from 'react-router-dom'
import {useDispatch, useSelector} from 'react-redux'
import {useTheme} from '@mui/material/styles'
import {Avatar, Chip, ListItemButton, ListItemIcon, ListItemText, Typography, useMediaQuery} from '@mui/material'
import FiberManualRecordIcon from '@mui/icons-material/FiberManualRecord'
import {setOpened} from "../../../../../store/slices/menuSlice";

const NavItem = ({item, level}: any) => {
    const theme: any = useTheme()
    const dispatch = useDispatch()
    const menu = useSelector((state: any) => state.menu)
    const matchesMD = useMediaQuery(theme.breakpoints.down('md'))

    const Icon = item.icon
    const itemIcon = item?.icon ? (
        <Icon stroke={1.5}/>
    ) : (
        <FiberManualRecordIcon
            sx={
                menu.current === item?.id
                    ? {
                        width: 8,
                        height: 8
                    }
                    : {
                        width: 6,
                        height: 6
                    }
            }
            fontSize={level > 0 ? 'inherit' : 'medium'}
        />
    )

    let itemTarget = '_self'
    if (item.target) {
        itemTarget = '_blank'
    }

    let listItemProps: any = {
        component: forwardRef((props, ref: any) => <Link ref={ref} {...props} to={item.url} target={itemTarget}/>)
    }
    if (item?.external) {
        listItemProps = {component: 'a', href: item.url, target: itemTarget}
    }

    const itemHandler = () => {
        if (matchesMD) {
            dispatch(setOpened(!menu.opened))
        }
    }

    return (
        <ListItemButton
            {...listItemProps}
            disabled={item.disabled}
            sx={{
                borderRadius: "12px",
                mb: 0.5,
                alignItems: 'flex-start',
                backgroundColor: level > 1 ? 'transparent !important' : 'inherit',
                py: level > 1 ? 1 : 1.25,
                pl: `${level * 24}px`
            }}
            selected={menu.current === item.url}
            onClick={itemHandler}
        >
            <ListItemIcon sx={{my: 'auto', minWidth: !item?.icon ? 18 : 36}}>{itemIcon}</ListItemIcon>
            <ListItemText
                primary={
                    <Typography
                        variant={menu.current === item.id ? 'h5' : 'body1'}
                        color="inherit">
                        {item.title}
                    </Typography>
                }
                secondary={
                    item.caption && (
                        <Typography variant="caption" sx={{...theme.typography.subMenuCaption}} display="block"
                                    gutterBottom>
                            {item.caption}
                        </Typography>
                    )
                }
            />
            {item.chip && (
                <Chip
                    color={item.chip.color}
                    variant={item.chip.variant}
                    size={item.chip.size}
                    label={item.chip.label}
                    avatar={item.chip.avatar && <Avatar>{item.chip.avatar}</Avatar>}
                />
            )}
        </ListItemButton>
    )
}

NavItem.propTypes = {
    item: PropTypes.object,
    level: PropTypes.number
}

export default NavItem
