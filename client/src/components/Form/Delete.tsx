import IconButton from "@mui/material/IconButton";
import DeleteIcon from "@mui/icons-material/Delete";
import {Tooltip} from "@mui/material";
import * as React from "react";

interface Props {
    onDelete: () => void;
}

const Delete = ({onDelete} :Props) => {
    return (
        <Tooltip title="Delete">
            <IconButton
                edge="end"
                aria-label="delete"
                onClick={onDelete}
            >
                <DeleteIcon/>
            </IconButton>
        </Tooltip>
    )
}

export default Delete