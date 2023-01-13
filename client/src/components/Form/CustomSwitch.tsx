import * as React from "react";
import {ReactElement, useState} from "react";
import {FormControlLabel, Switch} from "@mui/material";

interface Props {
    id: string;
    labelIfChecked: ReactElement;
    labelIfNotChecked: ReactElement;
    checked?: boolean;
    onChange?: (checked: boolean) => void;
}

const CustomSwitch = ({id, labelIfChecked = <></>, labelIfNotChecked = <></>, checked = true, onChange}: Props) => {

    const [label, setLabel] = useState<ReactElement>(checked ? labelIfChecked : labelIfNotChecked)

    return <FormControlLabel
        control={
            <Switch
                id={id}
                defaultChecked={checked}
                onChange={
                    (event: React.ChangeEvent<HTMLInputElement>) => {
                        setLabel(event.target.checked ? labelIfChecked : labelIfNotChecked)
                        if (onChange)
                            onChange(event.target.checked);
                    }
                }
            />
        }
        label={label}
    />
}

export default CustomSwitch