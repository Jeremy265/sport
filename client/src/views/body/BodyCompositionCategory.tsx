import {deleteBodyComposition, IBodyComposition} from "../../services/bodyCompositions.service"
import TimeLineChart from "../../ui-component/charts/TimeLineChart"
import {getTimeLineChartDataFromBodyCompositions} from "../../utils/chart.utils";
import ExpandablePanel from "../../ui-component/ExpandablePanel";
import PaginatedTable from "../../ui-component/PaginatedTable";
import {dateToString, extractDistinctDatesString} from "../../utils/date.utils";
import CustomMenu from "../../ui-component/menu/CustomMenu";
import CustomMenuItem from "../../ui-component/menu/CustomMenuItem";
import ContentCopyIcon from "@mui/icons-material/ContentCopy";
import DeleteIcon from "@mui/icons-material/Delete";
import CustomModal from "../../ui-component/CustomModal";
import * as React from "react";
import {useState} from "react";
import BodyCompositionForm from "../../ui-component/forms/customforms/BodyCompositionForm";
import {sortObject} from "../../utils/object.utils";
import {useDispatch} from "react-redux";
import {setMessage} from "../../store/slices/messageSlice";

interface Props {
    bodyCompositions: IBodyComposition[]
    onUpdate: (bodyComposition: IBodyComposition) => void
    onDelete: (bodyComposition: IBodyComposition) => void
}

const BodyCompositionCategory = ({bodyCompositions, onUpdate, onDelete}: Props) => {

    const [open, setOpen] = useState<boolean>(false)
    const [formValue, setFormValue] = useState<IBodyComposition>(undefined)

    const dispatch = useDispatch()

    const handleUpdate = (bodyCompositionId: number) => {
        const bodyComposition = bodyCompositions.find((bodyComposition: IBodyComposition) =>
            Number(bodyComposition.body_composition_id) === Number(bodyCompositionId)
        )
        if (!bodyComposition) {
            return dispatch(setMessage({text: 'Record does not exists !', severity: 'error'}))
        }
        setFormValue(bodyComposition)
        setOpen(true)
    }

    const handleDelete = (bodyCompositionId: number) => {
        const bodyComposition = bodyCompositions.find((bodyComposition: IBodyComposition) =>
            Number(bodyComposition.body_composition_id) === Number(bodyCompositionId)
        )

        if (!bodyComposition)
            return dispatch(setMessage({text: 'Record does not exists !', severity: 'error'}))

        deleteBodyComposition(bodyComposition)
            .then((bodyComposition: IBodyComposition) => {
                onDelete(bodyComposition)
                dispatch(setMessage({text: 'Body composition deleted !', severity: 'success'}))
            })
            .catch((error: Error) =>
                dispatch(setMessage({text: error.message, severity: 'error'}))
            )
    }

    return <>
        <TimeLineChart
            dates={extractDistinctDatesString(bodyCompositions)}
            data={getTimeLineChartDataFromBodyCompositions(bodyCompositions)}
        />
        <ExpandablePanel title="Records">
            <PaginatedTable<IBodyComposition>
                columns={[
                    {
                        id: 'date',
                        label: 'Date',
                        format: (date: Date) =>
                            dateToString(date)
                    },
                    {
                        id: 'value',
                        label: 'Value',
                    },
                    {
                        id: 'body_composition_id',
                        label: 'Action',
                        format: (value: number) =>
                            <CustomMenu>
                                <CustomMenuItem text="Update"
                                                icon={<ContentCopyIcon/>}
                                                onClick={() => handleUpdate(value)}/>
                                <CustomMenuItem text="Delete"
                                                icon={<DeleteIcon/>}
                                                onClick={() => handleDelete(value)}/>
                            </CustomMenu>
                    }
                ]}
                rows={
                    sortObject({
                        array: bodyCompositions,
                        key: 'date',
                        dataType: 'date'
                    }).map((bodyComposition: IBodyComposition) =>
                        ({
                            ...bodyComposition,
                            value: bodyComposition.value
                        })
                    )
                }/>
        </ExpandablePanel>
        <CustomModal title="Update set"
                     open={open}
                     onClose={() => setOpen(false)}>
            <BodyCompositionForm
                initialValues={formValue}
                handleResponse={
                    (bodyComposition: IBodyComposition) => {
                        setOpen(false)
                        onUpdate(bodyComposition)
                    }
                }
            />
        </CustomModal>
    </>
}

export default BodyCompositionCategory
