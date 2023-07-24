import * as React from "react"
import {ChangeEvent, cloneElement, ReactElement, useEffect, useState} from "react"
import {AutocompleteRenderInputParams, Box, TextField} from "@mui/material"
import Autocomplete, {createFilterOptions} from "@mui/material/Autocomplete"
import {FilterOptionsState} from "@mui/base"
import CustomForm from "../customforms/CustomForm"
import CustomModal from "../../CustomModal"
import {removeAccentsAndLowerCase} from "../../../utils/string.utils";
import Loading from "../../Loading";
import BasicSkeleton from "../../Skeleton/BasicSkeleton";
import {useDispatch} from "react-redux";
import {setMessage} from "../../../store/slices/messageSlice";

interface Props<T> {
    id: string
    itemName: string
    primaryKey: keyof T
    getData: () => Promise<T[]>
    getNewOption: (value?: string) => T
    formElements: ReactElement[]
    handleSubmit: (option: T) => Promise<T | void>
    validationSchema: any
    onChange: (option: T | null) => void
    defaultValue?: T
    error?: boolean
    helperText?: string
    onBlur?: () => void
}

const CreatableAutoComplete = <T, >({
                                        id,
                                        itemName,
                                        primaryKey,
                                        getData,
                                        getNewOption,
                                        formElements,
                                        handleSubmit,
                                        validationSchema,
                                        onChange,
                                        defaultValue,
                                        error,
                                        helperText,
                                        onBlur
                                    }: Props<T>) => {

    const filter = createFilterOptions<(T)>()

    const [options, setOptions] = useState<T[]>([])
    const [loading, setLoading] = useState<boolean>(true)
    const [value, setValue] = useState<any>(defaultValue ?? getNewOption())
    const [formOpen, setFormOpen] = useState<boolean>(false)
    const [formValue, setFormValue] = useState<T>(getNewOption())

    const dispatch = useDispatch()

    useEffect(() => {
        getData()
            .then((data: T[]) => {
                setOptions(data)
            })
            .catch((error: Error) => {
                dispatch(setMessage({text: error.message, severity: 'error'}))
            })
            .finally(() => {
                setLoading(false)
            })
    }, [])

    const handleChange = (event: ChangeEvent, inputOption: any) => {
        setValue(inputOption)
        let option: T = typeof inputOption === 'string'
            ? getOptionByInput(inputOption)
            : inputOption

        if (!option) {
            option = getNewOption(inputOption)
        }

        if (onChange)
            onChange(option)

        if (inputOption && isNewOption(option)) {
            setFormOpen(true)
            setFormValue(option)
        }
    }

    const handleCloseForm = (clear: boolean = true) => {
        const value = getNewOption()
        setFormValue(value)
        if (clear) {
            setValue(value)
        }
        setFormOpen(false)
    }

    const groupBy = (option: T) =>
        removeAccentsAndLowerCase(String(option[primaryKey])[0]).toUpperCase()

    const getOptionLabel = (option: any) =>
        typeof option === 'string' ? option : option[primaryKey]

    const getOptionByInput = (input: string) =>
        options.find((option: T) => option[primaryKey] === input)

    const isNewOption = (optionToFind: T) =>
        options.find((option: T) =>
            optionToFind[primaryKey] === option[primaryKey]
        ) === undefined

    const renderOption = (props: Object, option: T): ReactElement =>
        <Box component="li" sx={{'& > img': {mr: 2, flexShrink: 0}}} {...props}>
            {(isNewOption(option) && `Add "${getOptionLabel(option)}"`) || getOptionLabel(option)}
        </Box>

    const filterOptions = (options: any[], params: FilterOptionsState<any>) => {
        const filtered: (T)[] = filter(options, params)
        if (params.inputValue.trim() !== '' && isNewOption(getNewOption(params.inputValue))) {
            filtered.push({
                ...getNewOption(params.inputValue)
            })
        }
        return filtered
    }

    const renderInput = (params: AutocompleteRenderInputParams): ReactElement =>
        <TextField label={itemName} {...params} error={error} helperText={helperText} onBlur={onBlur}
                   variant="standard" margin="normal"/>

    return <>
        <Autocomplete
            id={id}
            loading={loading}
            options={options}
            value={value}
            clearOnBlur
            handleHomeEndKeys
            freeSolo
            selectOnFocus
            onChange={handleChange}
            groupBy={groupBy}
            getOptionLabel={getOptionLabel}
            renderOption={renderOption}
            filterOptions={filterOptions}
            renderInput={renderInput}
        />
        <CustomModal
            title={`Add new ${itemName}`}
            open={formOpen}
            onClose={handleCloseForm}
        >
            <CustomForm
                initialValues={formValue}
                validationSchema={validationSchema}
                handleSubmit={handleSubmit}
                messageOnResponseOk={`${itemName} saved !`}
                handleResponse={
                    (option: T) => {
                        options.push(option)
                        if (onChange)
                            onChange(option)
                        handleCloseForm(false)
                    }
                }>
                {
                    formElements.map((element: ReactElement, index: number) =>
                        cloneElement(element, {
                            key: index
                        })
                    )
                }
            </CustomForm>
        </CustomModal>
    </>
}

export default CreatableAutoComplete