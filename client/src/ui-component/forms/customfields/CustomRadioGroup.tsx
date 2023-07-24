import * as React from 'react'
import {useState} from 'react'
import {FormControl, FormControlLabel, FormLabel, Radio, RadioGroup} from "@mui/material";

interface Props {
    values: {label: string, value: string}[]
    label?: string,
    initialValue?: string,
    onChange?: (value: string) => void
}

const CustomRadioGroup = ({values, label, initialValue = values?.[0].value, onChange}: Props) => {

    const [value, setValue] = useState<string>(initialValue);

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const value = event.target.value

        setValue(value)

        if (onChange)
            onChange(value)
    };

    return <FormControl>
        <FormLabel>{label}</FormLabel>
        <RadioGroup
            row
            name="group"
            value={value}
            onChange={handleChange}
        >
            {
                values.map((value: {label: string, value: string}) =>
                    <FormControlLabel
                        key={value.label}
                        value={value.value}
                        control={<Radio/>}
                        label={value.label}
                    />
                )
            }
        </RadioGroup>
    </FormControl>
}

export default CustomRadioGroup