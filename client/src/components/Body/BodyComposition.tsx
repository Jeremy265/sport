import * as React from 'react'
import {Box, Paper} from '@mui/material'
import DeleteIcon from "@mui/icons-material/Delete"
import TimeLineChart from '../Chart/TimeLineChart'
import {deleteBodyComposition, IBodyComposition} from "../../services/bodyCompositions.service"
import Title from "../Title/Title"
import * as dayjs from "dayjs"
import PaginatedTable from "../Table/PaginatedTable"
import CustomMenu from "../Form/CustomMenu";
import CustomMenuItem from "../Form/CustomMenuItem";
import CreateRoundedIcon from "@mui/icons-material/CreateRounded";
import ExpandablePanel from "../ExpandablePanel/ExpandablePanel";

interface Props {
    title: string
    bodyCompositions: IBodyComposition[]
    handleUpdateBodyComposition: (bodyCompositionId: number) => void
    handleDeleteBodyComposition: (bodyCompositionId: number) => void
}

const BodyComposition = ({title, bodyCompositions, handleUpdateBodyComposition, handleDeleteBodyComposition}: Props) => {

    return <Paper sx={{p: 2, display: 'flex', flexDirection: 'column'}}>
        <Box
            component={"div"}
            sx={{display: 'flex', flexDirection: 'row', justifyContent: 'space-between'}}
        >
            <Title>{title}</Title>
        </Box>
        <TimeLineChart
            title={title}
            data={
                bodyCompositions.map((bodyComposition: IBodyComposition) =>
                    ({
                        x: dayjs(bodyComposition.date).format('DD/MM/YYYY'),
                        y: Math.round(Number(bodyComposition.value) * 10) / 10
                    })
                )
            }
            xLabel={'Time'}
            yLabel={title}/>
        <ExpandablePanel title="Records">
            <PaginatedTable<IBodyComposition>
                columns={[
                    {
                        id: 'date',
                        label: 'Date',
                        format: (value: string) =>
                            dayjs(value).format('DD/MM/YYYY')
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
                                <CustomMenuItem onClick={() =>
                                    handleUpdateBodyComposition(value)
                                }
                                                text="Update"
                                                icon={<CreateRoundedIcon/>}/>
                                <CustomMenuItem onClick={() =>
                                    handleDeleteBodyComposition(value)
                                }
                                                text="Delete"
                                                icon={<DeleteIcon/>}/>
                            </CustomMenu>
                    }
                ]}
                rows={
                    bodyCompositions.map((bodyComposition: IBodyComposition) =>
                        ({
                            ...bodyComposition,
                            value: bodyComposition.value
                        })
                    )
                }/>
        </ExpandablePanel>
    </Paper>
}

export default BodyComposition
