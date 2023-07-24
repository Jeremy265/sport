import {IconDashboard} from '@tabler/icons'
import {MenuGroup} from "./MenuItems";

const icons = { IconDashboard }

// ==============================|| DASHBOARD MENU ITEMS ||============================== //

const dashboard: MenuGroup = {
    id: 'dashboard',
    type: 'group',
    children: [
        {
            id: 'dashboard',
            title: 'Dashboard',
            type: 'item',
            url: '/',
            icon: icons.IconDashboard,
            breadcrumbs: true
        }
    ]
}

export default dashboard
