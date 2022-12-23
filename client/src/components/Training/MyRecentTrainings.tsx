import * as React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Title from '../Title/Title';
import {useEffect, useState} from "react";
import {getTrainings, ITraining} from "../../services/trainings.service";
import * as dayjs from "dayjs";
import { Paper } from '@mui/material';

export default function MyRecentTrainings() {
    const [trainings, setTrainings] = useState<ITraining[]>([])

    useEffect(() => {
        getTrainings()
            .then((trainings: ITraining[]) => {
                setTrainings(trainings)
            }).catch((error: any) => {
                console.log(error)
            })
    }, [])

    return (
        <Paper
            sx={{
                p: 2,
                display: 'flex',
                flexDirection: 'column',
                height: 240,
            }}
        > <Title>My recent trainings</Title>
            <Table size="small">
                <TableHead>
                    <TableRow>
                        <TableCell>Date</TableCell>
                        <TableCell>Title</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {trainings.map((training: ITraining) => (
                        <TableRow key={training.training_id}>
                            <TableCell>{training.title}</TableCell>
                            <TableCell>{dayjs(training.date).format('DD/MM/YYYY')}</TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </Paper>
    );
}
