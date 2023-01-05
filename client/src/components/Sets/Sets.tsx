import * as React from 'react';
import {deleteSet, ISet} from "../../services/sets.service";
import Title from "../Title/Title";
import {Avatar, Paper} from "@mui/material";
import CustomList from "../List/CustomList";
import CustomListItem from "../List/CustomListItem";
import {FitnessCenterRounded} from "@mui/icons-material";
import CustomListIcon from "../List/CustomListIcon";

interface Props {
    loading: boolean;
    sets: ISet[];
    onDeleteSet: (set: ISet) => void;
}

const Sets = ({loading, sets, onDeleteSet}: Props) => {

    const handleDelete = (set_id: number) => {
        deleteSet(set_id)
            .then((set: ISet) => {
                onDeleteSet(set)
            }).catch((error: Error) => {
            alert(error)
        })
    }

    return (
        <Paper sx={{p: 2}}>
            <Title>Sets</Title>
            <CustomList loading={loading}>
                {sets.map((set: ISet) =>
                    <CustomListItem
                        key={set.set_id}
                        onDelete={() => handleDelete(set.set_id)}
                        icon={<CustomListIcon icon={<CustomListIcon src={''} alt={set.exercises.title}/>}/>}
                        text={`${set.exercises.title} : ${set.repetitions}x${set.value}${set.exercises.units.title}`}
                    />
                )}
            </CustomList>
        </Paper>
    )
}

export default Sets