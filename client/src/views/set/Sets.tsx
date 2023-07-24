import * as React from 'react'
import {ISet} from "../../services/sets.service"
import ExpandablePanel from "../../ui-component/ExpandablePanel"
import MainCard from "../../ui-component/cards/MainCard";
import CustomList from '../../ui-component/lists/CustomList';
import {Badge, Typography} from "@mui/material";
import {groupSetsByExercise} from "../../utils/sets.utils";
import OneSet from "./Set";
import {IExercise} from "../../services/exercises.service";
import Loading from "../../ui-component/Loading";

interface Props {
    sets: ISet[]
    onUpdate: (set: ISet) => void
    onDelete: (set: ISet) => void
    loading?: boolean
}

const Sets = ({sets = [], onUpdate, onDelete, loading}: Props) =>

    <MainCard title={`${sets.length} set${sets.length > 0 ? 's' : ''}`}>
        <Loading isLoading={loading}>
            {
                Object.values(groupSetsByExercise(sets))
                    .map(({exercise, sets}: {
                            exercise: IExercise,
                            sets: ISet[]
                        }) =>
                            <ExpandablePanel
                                key={exercise.title}
                                title={
                                    <Badge badgeContent={sets.length}
                                           color="primary">
                                        <Typography pr={1.5}>{exercise.title}</Typography>
                                    </Badge>
                                }>
                                <CustomList>
                                    {
                                        sets.map((set: ISet) =>
                                            <OneSet key={set.set_id}
                                                    set={set}
                                                    onUpdate={onUpdate}
                                                    onDelete={onDelete}/>
                                        )
                                    }
                                </CustomList>
                            </ExpandablePanel>
                    )
            }
        </Loading>
    </MainCard>

export default Sets