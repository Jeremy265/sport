import * as React from 'react'
import {useState} from 'react'
import {deleteSet, ISet, updateSet} from "../../services/sets.service"
import {Badge, Paper, Typography} from "@mui/material"
import CustomList from "../List/CustomList"
import CustomListItem from "../List/CustomListItem"
import CustomListIcon from "../List/CustomListIcon"
import Title from "../Title/Title"
import {groupSetsByExercise} from "../../utils/utils"
import {IExercise} from "../../services/exercises.service"
import CustomForm from "../Form/CustomForm"
import CustomModal from "../Modal/CustomModal"
import NumberField from "../Form/Fields/NumberField"
import ExerciseField from "../Form/Fields/ExerciseField"
import ExpandablePanel from "../ExpandablePanel/ExpandablePanel"


interface Props {
    loading: boolean
    sets: ISet[]
    onUpdateSet: (set: ISet) => void
    onDeleteSet: (set: ISet) => void
}

const Sets = ({loading, sets = [], onUpdateSet, onDeleteSet}: Props) => {

    const [formOpen, setFormOpen] = useState<boolean>(false)
    const [formValue, setFormValue] = useState<ISet>()

    const handleCloseForm = () => {
        setFormOpen(false)
        setFormValue(null)
    }

    const handleUpdate = (set: ISet) => {
        setFormOpen(true)
        setFormValue(set)
    }

    const handleDelete = (set_id: number) => {
        deleteSet(set_id)
            .then((set: ISet) => {
                onDeleteSet(set)
            })
            .catch((error: Error) => {
                alert(error)
            })
    }

    return (
        <Paper sx={{p: 2}}>
            <Title>Sets</Title>
            {
                sets.length === 0
                    ? 'No sets'
                    : Object.values(groupSetsByExercise(sets))
                        .map((setsByExercise: {
                            exercise: IExercise,
                            sets: ISet[]
                        }) =>
                            <ExpandablePanel
                                key={setsByExercise.exercise.title}
                                title={
                                    <Badge badgeContent={setsByExercise.sets.length}
                                           color="primary">
                                        <Typography>{setsByExercise.exercise.title}</Typography>
                                    </Badge>
                                }
                            >
                                <CustomList loading={loading}>
                                    {
                                        setsByExercise.sets.map((set: ISet) =>
                                            <CustomListItem
                                                key={set.set_id}
                                                icon={
                                                    <CustomListIcon
                                                        icon={<CustomListIcon src={undefined}
                                                                              alt={undefined}/>}
                                                    />
                                                }
                                                text={`${set.exercises.title} : ${set.repetitions}x${set.value}${set.exercises.units.title}`}
                                                onUpdate={
                                                    () =>
                                                        handleUpdate(set)
                                                }
                                                onDelete={
                                                    () =>
                                                        handleDelete(set.set_id)
                                                }
                                            />
                                        )
                                    }
                                </CustomList>
                            </ExpandablePanel>
                )
            }
            <CustomModal
                title={`Update Set`}
                open={formOpen}
                onClose={handleCloseForm}
            >
                <CustomForm<ISet>
                    onChange={
                        (set: ISet) =>
                            setFormValue({
                                ...Object.assign(formValue, set),
                                exercise_id: set.exercises.exercise_id
                            })
                    }
                    onSubmit={
                        (_: ISet) =>
                            updateSet(formValue)
                                .then((set: ISet) => {
                                    onUpdateSet(set)
                                    handleCloseForm()
                                }).catch((error: Error) =>
                                alert(error.message)
                            )
                    }
                    fields={[
                        <ExerciseField id="exercises" defaultValue={formValue?.exercises}/>,
                        <NumberField id="repetitions" label="Repetitions" defaultValue={formValue?.repetitions}/>,
                        <NumberField id="value" label="Value" defaultValue={formValue?.value}
                                     unit={formValue?.exercises?.units?.title}/>
                    ]}
                />
            </CustomModal>
        </Paper>
    )
}

export default Sets