import CreateRoundedIcon from '@mui/icons-material/CreateRounded';
import * as React from "react";
import CustomIconButton from "./CustomIconButton";

interface Props {
    onUpdate: () => void;
}

const Update = ({onUpdate} :Props) => {
    return (
        <CustomIconButton onClick={onUpdate} icon={<CreateRoundedIcon/>} toolTip={"Update"}/>
    )
}

export default Update