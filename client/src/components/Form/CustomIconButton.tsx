import * as React from "react";
import {ReactElement} from "react";
import IconButton from "@mui/material/IconButton";
import {Tooltip} from "@mui/material";

interface Props {
    onClick: () => void;
    icon: ReactElement;
    toolTip?: string;
}

const CustomIconButton = ({onClick, icon, toolTip = ""}: Props) => {
    return (
        <Tooltip title={toolTip}>
            <IconButton
                edge="end"
                aria-label={toolTip}
                onClick={onClick}
            >
                {icon}
            </IconButton>
        </Tooltip>
    )
}

export default CustomIconButton
