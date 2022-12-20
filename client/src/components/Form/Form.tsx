import * as React from 'react';
import {FormEvent, ReactElement} from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Box from '@mui/material/Box';
import {getJSONFromForm} from "../../utils/forms";
import {AdapterDayjs} from "@mui/x-date-pickers/AdapterDayjs";
import {DatePicker, LocalizationProvider} from "@mui/x-date-pickers";
import {TextFieldProps} from "@mui/material";

interface FormField {
    id: string;
    type: string;
    name: string;
    label: string;
    required: boolean;
    autofocus: boolean;
    defaultValue: any;
}

interface FormProps {
    onSubmit: (data: any) => void;
    fields: FormField[];
    children: ReactElement[]
}

const Form = ({onSubmit, fields, children}: FormProps) => {

    const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        const data = getJSONFromForm(event.currentTarget)
        onSubmit(data)
    };

    return (
        <Box component="form" onSubmit={handleSubmit} noValidate sx={{mt: 1}}>
            {fields.map((field: FormField) => {
                switch (field.type) {
                    case 'text':
                        return <TextField
                            margin="normal"
                            required={field.required}
                            fullWidth
                            id={field.id}
                            label={field.label}
                            name={field.name}
                            autoFocus={field.autofocus}
                            defaultValue={field.defaultValue}
                        />
                    case 'date':
                        return <LocalizationProvider dateAdapter={AdapterDayjs} adapterLocale={'fr'}>
                            <DatePicker
                                label={field.label}
                                value={field.defaultValue}
                                onChange={(date: any) => {

                                }}
                                renderInput={(params: TextFieldProps) => <TextField required {...params} />}
                            />
                        </LocalizationProvider>
                }
            })
            }
            {children}
            <Button
                type="submit"
                fullWidth
                variant="contained"
                sx={{mt: 3, mb: 2}}
            >
                Submit
            </Button>
        </Box>
    );
}

export default Form
