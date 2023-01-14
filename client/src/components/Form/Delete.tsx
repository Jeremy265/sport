import DeleteIcon from "@mui/icons-material/Delete";
import * as React from "react";
import CustomIconButton from "./CustomIconButton";

interface Props {
    onDelete: () => void;
}

const Delete = ({onDelete} :Props) => {
    return (
        <CustomIconButton onClick={onDelete} icon={<DeleteIcon/>} toolTip={"Delete"}/>
    )
}

export default Delete
