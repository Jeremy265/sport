import * as React from 'react';
import {deleteSet, ISet} from "../../services/sets.service";
import {Accordion, AccordionDetails, AccordionSummary, Paper, Typography} from "@mui/material";
import CustomList from "../List/CustomList";
import CustomListItem from "../List/CustomListItem";
import CustomListIcon from "../List/CustomListIcon";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import Title from "../Title/Title";
import {getSetsByExercises} from "../../utils/utils";
import {IExercise} from "../../services/exercises.service";

interface Props {
    loading: boolean;
    sets: ISet[];
    onDeleteSet: (set: ISet) => void;
}

const Sets = ({loading, sets = [], onDeleteSet}: Props) => {

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
                : getSetsByExercises(sets)
                    .map((setsByExercise: { exercise: IExercise, sets: ISet[] }) =>
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
                                <Typography>{setsByExercise.exercise.title}</Typography>
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