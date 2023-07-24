import dashboard from './dashboard'
import training from "./training";
import body from "./body";
import {TablerIcon} from "@tabler/icons";
import {ReactElement} from "react";
import evolution from "./evolution";

export interface MenuGroupItem {
    id: string,
    title: string,
    type: 'item' | 'collapse',
    url?: string,
    icon?: TablerIcon | ReactElement,
    breadcrumbs?: boolean
    external?: boolean,
    target?: boolean,
    children?: MenuGroupItem[]
}

export interface MenuGroup {
    id: string,
    type: 'group',
    title?: string,
    caption?: string,
    children: MenuGroupItem[]
}

const menuItems = {
    items: [dashboard, training, body, evolution]
}

export default menuItems
