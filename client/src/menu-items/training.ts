import {MenuGroup} from "./MenuItems";
import FitnessCenterIcon from '@mui/icons-material/FitnessCenter';

const training: MenuGroup = {
    id: 'training',
    type: 'group',
    children: [
        {
            id: 'training-mode',
            title: 'Training Mode',
            type: 'item',
            url: '/training-mode',
            icon: FitnessCenterIcon,
        }
    ]
}

export default training
