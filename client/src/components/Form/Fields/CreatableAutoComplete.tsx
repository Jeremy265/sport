import * as React from "react"
import {ChangeEvent, ReactElement, useState} from "react"
import {AutocompleteRenderInputParams, Box, CircularProgress} from "@mui/material"
import Autocomplete, {createFilterOptions} from "@mui/material/Autocomplete"
import {FilterOptionsState} from "@mui/base"
import CustomModal from "../../Modal/CustomModal"
import CustomForm from "../CustomForm"

interface Props<T> {
    id: string
    itemName: string
    loading: boolean
    options: T[]
    getOptionByInput: (value: string) => T
    getNewOption: (value?: string) => T
    isNewOption: (option: T) => boolean
    formElements: ReactElement[]
    onSubmit: (option: T) => Promise<T | void>
    onChange: (option: T | null) => void
    groupBy: (option: T) => string
    getOptionLabel: (option: T | string) => string
    renderInput: (params: AutocompleteRenderInputParams) => ReactElement
    defaultValue?: T
}

const CreatableAutoComplete = <T, >({
                                        id,
                                        itemName,
                                        loading,
                                        options,
                                        getOptionByInput,
                                        getNewOption,
                                        isNewOption,
                                        formElements,
                                        onSubmit,
                                        onChange,
                                        groupBy,
                                        getOptionLabel,
                                        renderInput,
                                        defaultValue
                                    }: Props<T>) => {

    const filter = createFilterOptions<(T)>()

    const [value, setValue] = useState<any>(defaultValue ?? getNewOption())
    const [formOpen, setFormOpen] = useState<boolean>(false)
    const [formValue, setFormValue] = useState<T>(getNewOption())

    const handleCloseForm = (clear: boolean = true) => {
        const value = getNewOption()
        setFormValue(value)
        if (clear) {
            setValue(value)
        }
        setFormOpen(false)
    }

    return <>
        {(loading && <CircularProgress/>) || <Autocomplete
            id={id}
            loading={loading}
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
                        setFormOpen(true)
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
                const filtered: (T)[] = filter(options, params)
                if (params.inputValue.trim() !== '' && isNewOption(getNewOption(params.inputValue))) {
                    filtered.push({
                        ...getNewOption(params.inputValue)
                    })
                }
                return filtered
            }}
        />
        }
        <CustomModal
            title={`Add new ${itemName}`}
            open={formOpen}
            onClose={handleCloseForm}
        >
            <CustomForm<T>
                onSubmit={
                    (data: T) =>
                        onSubmit(Object.assign(formValue, data))
                            .then((option: T) => {
                                options.push(option)
                                onChange(option)
                                handleCloseForm(false)
                            }).catch((error: Error) => {
                            alert(error)
                        })
                }
                fields={
                    formElements.map((element: ReactElement, index: number) =>
                        React.cloneElement(element, {
                            key: index,
                            defaultValue: element.props.autoFocus ? getOptionLabel(formValue) : '',
                        })
                    )
                }
            />
        </CustomModal>
    </>
}

export default CreatableAutoComplete