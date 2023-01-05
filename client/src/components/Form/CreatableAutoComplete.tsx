import * as React from "react";
import {ChangeEvent, KeyboardEventHandler, ReactElement, useState} from "react";
import {AutocompleteRenderInputParams, Box, CircularProgress, TextField} from "@mui/material";
import Autocomplete, {createFilterOptions} from "@mui/material/Autocomplete";
import {FilterOptionsState} from "@mui/base";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogActions from "@mui/material/DialogActions";
import Button from "@mui/material/Button";

interface Props<T> {
    id: string;
    options: T[];
    getOptionByInput: (value: string) => T;
    getNewOption: (value?: string) => T;
    isNewOption: (option: T) => boolean;
    formElements: ReactElement[];
    onSubmit: (option: T) => Promise<T | void>;
    onChange: (option: T | null) => void;
    groupBy: (option: T) => string;
    getOptionLabel: (option: T | string) => string;
    renderInput: (params: AutocompleteRenderInputParams) => ReactElement;
}

const CreatableAutoComplete = <T, >({
                                        id,
                                        options,
                                        getOptionByInput,
                                        getNewOption,
                                        isNewOption,
                                        formElements,
                                        onSubmit,
                                        onChange,
                                        groupBy,
                                        getOptionLabel,
                                        renderInput
                                    }: Props<T>) => {

    const filter = createFilterOptions<(T)>();

    const [value, setValue] = useState<any>(getNewOption());
    const [formOpen, setFormOpen] = useState<boolean>(false);
    const [formValue, setFormValue] = useState<T>(getNewOption())

    const handleCloseForm = (clear: boolean = true) => {
        const value = getNewOption()
        setFormValue(value);
        if (clear) {
            setValue(value)
        }
        setFormOpen(false);
    };

    return <>
        {(options.length === 0 && <CircularProgress/>) || <Autocomplete
            id={id}
            options={options}
            value={value}
            clearOnBlur
            handleHomeEndKeys
            freeSolo
            selectOnFocus
            onChange={
                (event: ChangeEvent, inputOption: any) => {
                    setValue(inputOption)
                    let option: T = typeof inputOption === 'string'
                        ? getOptionByInput(inputOption)
                        : inputOption

                    if (!option) {
                        option = getNewOption(inputOption)
                    }

                    onChange(option)

                    if (inputOption && isNewOption(option)) {
                        setFormOpen(true);
                        setFormValue(option)
                    }
                }}
            groupBy={groupBy}
            getOptionLabel={getOptionLabel}
            renderInput={renderInput}
            renderOption={(props: Object, option: T): ReactElement =>
                <Box component="li" sx={{'& > img': {mr: 2, flexShrink: 0}}} {...props}>
                    {(isNewOption(option) && `Add "${getOptionLabel(option)}"`) || getOptionLabel(option)}
                </Box>
            }
            filterOptions={(options: any[], params: FilterOptionsState<any>) => {
                const filtered: (T)[] = filter(options, params);
                if (params.inputValue.trim() !== '' && isNewOption(getNewOption(params.inputValue))) {
                    filtered.push({
                        ...getNewOption(params.inputValue)
                    })
                }
                return filtered;
            }}
        />
        }
        <Dialog open={formOpen} onClose={handleCloseForm}>
            <DialogTitle>Add new item</DialogTitle>
            <DialogContent>
                <DialogContentText>
                    It will be visible by all users
                </DialogContentText>
                {formElements.map((element: ReactElement, index: number) =>
                    React.cloneElement(element, {
                        key: index,
                        defaultValue: element.props.autoFocus ? getOptionLabel(formValue) : '',
                        onChange: (object: any) => {
                            setFormValue({
                                ...formValue,
                                [element.props.id]: object.currentTarget
                                    ? object.currentTarget.value
                                    : object
                            })
                        }
                    })
                )}
            </DialogContent>
            <DialogActions>
                <Button onClick={() => handleCloseForm()}>Cancel</Button>
                <Button onClick={() =>
                    onSubmit(formValue)
                        .then((option: T) => {
                            options.push(option)
                            onChange(option)
                            handleCloseForm(false);
                        }).catch((error: Error) => {
                        alert(error)
                    })
                }>
                    Add
                </Button>
            </DialogActions>
        </Dialog>
    </>
}

export default CreatableAutoComplete