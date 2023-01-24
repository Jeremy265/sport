import * as React from 'react';
import {deleteSet, ISet} from "../../services/sets.service";
import {Accordion, AccordionDetails, AccordionSummary, Badge, Paper, Typography} from "@mui/material";
import CustomList from "../List/CustomList";
import CustomListItem from "../List/CustomListItem";
import CustomListIcon from "../List/CustomListIcon";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import Title from "../Title/Title";
import {groupSetsByExercise} from "../../utils/utils";
import {IExercise} from "../../services/exercises.service";


interface Props {
    loading: boolean;
    sets: ISet[];
    onDeleteSet: (set: ISet) => void;
}

const Sets = ({loading, sets = [], onDeleteSet}: Props) => {

    const handleUpdate = (set: ISet) => {
        console.log(set)
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
            <Title>Sets</Title> {
            sets.length === 0
                ? 'No sets'
                : Object.values(groupSetsByExercise(sets))
                    .map((setsByExercise: {
                            exercise: IExercise,
                            sets: ISet[]
                        }) =>
                            <Accordion
                                key={setsByExercise.exercise.title}
                                sx={{
                                    marginTop: '2em',
                                }}>
                                <AccordionSummary
                                    expandIcon={<ExpandMoreIcon/>}
                                    aria-controls="panel1a-content"
                                    id="panel1a-header"
                                >
                                    <Badge
                                        badgeContent={setsByExercise.sets.length}
                                        color="primary"
                                    >
                                        <Typography>{setsByExercise.exercise.title}</Typography>
                                    </Badge>
                                </AccordionSummary>
                                <AccordionDetails>
                                    <CustomList loading={loading}>
                                        {
                                            setsByExercise.sets.map((set: ISet) =>
                                                <CustomListItem
                                                    key={set.set_id}
                                                    icon={<CustomListIcon
                                                        icon={<CustomListIcon src={undefined}
                                                                              alt={undefined}/>}/>}
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
                                </AccordionDetails>
                            </Accordion>
                    )
        }
        </Paper>
    )
}

export default Sets