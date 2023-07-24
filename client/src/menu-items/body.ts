import {MenuGroup} from "./MenuItems"
import ScaleIcon from '@mui/icons-material/Scale'

const training: MenuGroup = {
    id: 'body',
    type: 'group',
    children: [
        {
            id: 'body-compositions',
            title: 'Body Compositions',
            type: 'item',
            url: '/body-compositions',
            icon: ScaleIcon,
        }
    ]
}

export default training
