import {ChangeEvent, Children, cloneElement, ReactElement, ReactNode, useState} from 'react';
import {Box, Button, FormHelperText} from '@mui/material';
import {Formik} from 'formik';
import AnimateButton from '../../extended/AnimateButton';
import {useDispatch} from "react-redux";
import {setMessage} from "../../../store/slices/messageSlice";

interface Props<T> {
    initialValues: T
    validationSchema: any
    handleSubmit: (values: T) => Promise<T>
    messageOnResponseOk: string
    handleResponse: (response: T) => void
    submitLabel?: string
    children?: ReactNode
}

const CustomForm = <T, >({
                             initialValues,
                             validationSchema,
                             handleSubmit,
                             messageOnResponseOk,
                             handleResponse,
                             submitLabel = 'Submit',
                             children
                         }: Props<T>) => {

    const [error, setError] = useState<string>(null)
    const dispatch = useDispatch()

    return <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={async (values, {setSubmitting}) => {
            handleSubmit(values)
                .then((response: T) => {
                    setError('')
                    dispatch(setMessage({text: messageOnResponseOk, severity: 'success'}))
                    handleResponse(response)
                })
                .catch((error: Error) => {
                    setError(error.message)
                    dispatch(setMessage({text: error.message, severity: 'error'}))
                })
                .finally(() =>
                    setSubmitting(false)
                )
        }}
    >
        {({errors, handleBlur, handleChange, setFieldValue, handleSubmit, isSubmitting, touched, values}: any) =>
            (
                <form noValidate onSubmit={handleSubmit}>
                    {error && (
                        <Box sx={{mt: 3}}>
                            <FormHelperText error>{error}</FormHelperText>
                        </Box>
                    )}
                    {
                        Children.map(children, (child: ReactElement) =>
                            cloneElement(child, {
                                key: child.props.id,
                                error: Boolean(touched[child.props.id] && errors[child.props.id]),
                                helperText: touched[child.props.id] && errors[child.props.id] ? errors[child.props.id] : "",
                                value: values[child.props.id],
                                onBlur: handleBlur,
                                onChange: (e: ChangeEvent) => {
                                    if (!e)
                                        return
                                    if (!e.target) {
                                        setFieldValue(child.props.id, e)
                                        if (child.props.onChange)
                                            child.props.onChange(e)
                                    } else {
                                        handleChange(e)
                                        if (child.props.onChange)
                                            child.props.onChange(e)
                                    }
                                }
                            })
                        )
                    }
                    <Box sx={{mt: 2}}>
                        <AnimateButton>
                            <Button
                                disableElevation
                                disabled={isSubmitting}
                                fullWidth
                                size="large"
                                type="submit"
                                variant="contained"
                                color="secondary"
                            >
                                {submitLabel}
                            </Button>
                        </AnimateButton>
                    </Box>
                </form>
            )
        }
    </Formik>
}

export default CustomForm;
