import {MenuGroup} from "./MenuItems";
import {IconChartLine} from "@tabler/icons";

const evolution: MenuGroup = {
    id: 'statistics',
    type: 'group',
    children: [
        {
            id: 'statistics',
            title: 'Statistics',
            type: 'collapse',
            icon: IconChartLine,
            children: [
                {
                    id: 'training-evolution',
                    title: 'Training Evolution',
                    type: 'item',
                    url: '/training-evolution',
                    icon: IconChartLine,
                },
                {
                    id: 'body-evolution',
                    title: 'Body Evolution',
                    type: 'item',
                    url: '/body-evolution',
                    icon: IconChartLine,
                }
            ]
        }
    ]
}

export default evolution

