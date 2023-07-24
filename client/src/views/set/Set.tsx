import * as React from 'react'
import {useState} from 'react'
import {deleteSet, ISet} from "../../services/sets.service"
import CustomListItem from '../../ui-component/lists/CustomListItem';
import CustomListIcon from "../../ui-component/lists/CustomListIcon";
import CustomModal from "../../ui-component/CustomModal";
import SetForm from "../../ui-component/forms/customforms/SetForm";
import {setMessage} from "../../store/slices/messageSlice";
import {useDispatch} from "react-redux";


interface Props {
    set: ISet
    onUpdate: (set: ISet) => void
    onDelete: (set: ISet) => void
}

const OneSet = ({set, onUpdate, onDelete}: Props) => {

    const [open, setOpen] = useState<boolean>(false)

    const dispatch = useDispatch()

    const handleDelete = (set_id: number) => {
        deleteSet(set_id)
            .then((set: ISet) => {
                onDelete(set)
                dispatch(setMessage({text: 'Set deleted !', severity: 'success'}))
            })
            .catch((error: Error) => {
                return dispatch(setMessage({text: error.message, severity: 'error'}))
            })
    }

    return (
        <>
            <CustomListItem
                key={set.set_id}
                icon={
                    <CustomListIcon/>
                }
                text={`${set.exercises.title} : ${set.repetitions}x${set.value}${set.exercises.units.title}`}
                onUpdate={
                    () => setOpen(true)
                }
                onDelete={
                    () => handleDelete(set.set_id)
                }
            />
            <CustomModal title="Update set"
                         open={open}
                         onClose={() => setOpen(false)}>
                <SetForm
                    initialValues={set}
                    handleResponse={
                        (set: ISet) => {
                            setOpen(false)
                            onUpdate(set)
                        }
                    }
                />
            </CustomModal>
        </>
    )
}

export default OneSet