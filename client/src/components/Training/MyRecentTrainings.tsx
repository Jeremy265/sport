import * as React from 'react';
import {useEffect, useState} from 'react';
import Title from '../Title/Title';
import {deleteTraining, getTrainings, ITraining} from "../../services/trainings.service";
import * as dayjs from "dayjs";
import {Paper} from '@mui/material';
import PaginatedTable from "../Table/PaginatedTable";
import Delete from "../Form/Delete";
import {ISet} from "../../services/sets.service";
import Sets from "../Sets/Sets";
import CustomListItem from "../List/CustomListItem";
import CustomList from "../List/CustomList";
import CustomListIcon from "../List/CustomListIcon";

export default function MyRecentTrainings() {
    const [trainings, setTrainings] = useState<ITraining[]>([])

    useEffect(() => {
        getTrainings()
            .then((trainings: ITraining[]) => {
                setTrainings(trainings)
            }).catch((error: any) => {
            alert(error)
        })
    }, [])

    const handleDeleteTraining = (training_id: number) =>
        deleteTraining(training_id)
            .then((trainingtoDelete: ITraining) => {
                setTrainings(
                    trainings.filter((training: ITraining) =>
                        training.training_id !== trainingtoDelete.training_id
                    )
                )
            })
            .catch((error: Error) => {
                alert(error.message)
            })


    return (
        <Paper sx={{p: 2, display: 'flex', flexDirection: 'column'}}>
            <Title>My recent trainings</Title>
            <PaginatedTable<ITraining>
                columns={[
                    {
                        id: 'title',
                        label: 'Title',
                    },
                    {
                        id: 'date',
                        label: 'Date',
                        format: (date: string) => dayjs(date).format('DD/MM/YYYY')
                    },
                    {
                        id: 'sets',
                        label: 'Sets',
                        format: (sets: ISet[]) =>
                            <CustomList loading={false}>
                                {sets.map((set: ISet) =>
                                    <CustomListItem
                                        key={set.set_id}
                                        icon={<CustomListIcon icon={<CustomListIcon src={set.exercises.image} alt={set.exercises.title}/>}/>}
                                        text={`${set.exercises.title} : ${set.repetitions}x${set.value}${set.exercises.units.title}`}
                                    />
                                )}
                            </CustomList>
                    },
                    {
                        id: 'training_id',
                        label: 'Delete',
                        format: (value: number) =>
                            <Delete onDelete={
                                () => handleDeleteTraining(value)
                            }/>
                    }
                ]}
                rows={trainings}/>
        </Paper>
    );
}
