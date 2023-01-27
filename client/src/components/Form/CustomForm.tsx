import * as React from 'react'
import {ReactElement, useEffect, useState} from 'react'
import Button from '@mui/material/Button'
import {Grid} from "@mui/material"

interface Props<T> {
    fields: ReactElement[]
    onSubmit: (data: T) => void
    onChange?: (data: T) => void
    submitTitle?: string
}

const CustomForm = <T, >({fields, onSubmit, onChange, submitTitle = "Submit"}: Props<T>) => {

    const [data, setData] = useState<T>()

    const handleChange = (data: T) => {
        setData(data)
        if (onChange)
            onChange(data)
    }

    useEffect(() => {
        const initialState: any = {}
        fields.map((field: ReactElement) => {
            Object.assign(initialState, {
                    [field.props.id]: field.props.defaultValue
                }
            )
        })
        handleChange(initialState)
    }, [])

    return (
        <Grid container mt={2} spacing={2}>
            {
                fields.map((field: ReactElement) =>
                    <Grid key={field.props.id} item xs={12}>
                        {
                            React.cloneElement(field, {
                                key: field.props.id,
                                onChange: (object: any) => {
                                    handleChange({
                                        ...data,
                                        [field.props.id]: object.currentTarget
                                            ? object.currentTarget.value
                                            : object
                                    })
                                }
                            })
                        }
                    </Grid>
                )
            }
            <Grid item xs={12}>
                <Button
                    type="submit"
                    fullWidth
                    variant="contained"
                    onClick={
                        () =>
                            onSubmit(data)
                    }
                >
                    {submitTitle}
                </Button>
            </Grid>
        </Grid>
    )
}

export default CustomForm
