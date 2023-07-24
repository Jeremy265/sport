import CustomForm from "./CustomForm";
import * as Yup from "yup";
import {createTraining, ITraining, updateTraining} from "../../../services/trainings.service";
import DateField from "../customfields/DateField";
import CustomFormInput from "../customfields/CustomFormInput";

interface Props {
    initialValues: ITraining
    handleResponse: (training: ITraining) => void
}

const TrainingForm = ({initialValues, handleResponse}: Props) => {

    return <CustomForm<ITraining>
        initialValues={initialValues}
        validationSchema={
            Yup.object().shape({
                training_id: Yup.number(),
                title: Yup.string().required('Title is required'),
                date: Yup.date().required('Date is required')
            })
        }
        handleSubmit={initialValues.training_id ? updateTraining : createTraining}
        messageOnResponseOk="Training saved !"
        handleResponse={handleResponse}
        submitLabel={initialValues.training_id ? "Update" : "New training"}
    >
        <DateField id="date"/>
        <CustomFormInput
            id="title"
            label="Title"
        />
    </CustomForm>
}

export default TrainingForm