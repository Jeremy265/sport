import * as React from "react";
import {ReactElement} from "react";
import IconButton from "@mui/material/IconButton";
import {Button, Tooltip} from "@mui/material";

interface Props {
    onClick: () => void;
    icon: ReactElement;
    text?: string;
    toolTip?: string;
}

const CustomIconButton = ({onClick, icon, text, toolTip = ""}: Props) => {
    return (
        <Tooltip title={toolTip}>
            {
                text
                    ? <Button
                        variant="contained"
                        endIcon={icon}
                        onClick={onClick}
                    >
                        {text}
                    </Button>
                    : <IconButton
                        edge="end"
                        aria-label={toolTip}
                        onClick={onClick}
                    >
                        {icon}
                    </IconButton>
            }
        </Tooltip>
    )
}

export default CustomIconButton
