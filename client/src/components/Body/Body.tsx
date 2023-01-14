import * as React from 'react';
import {useEffect, useState} from 'react';
import {
    Accordion,
    AccordionDetails,
    AccordionSummary,
    Box,
    CircularProgress,
    Container,
    Grid,
    Paper,
    Typography
} from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import TimeLineChart from '../Chart/TimeLineChart';
import {deleteBodyComposition, getBodyComposition, IBodyComposition} from "../../services/bodyCompositions.service";
import {
    deleteBodyCompositionCategory,
    getBodyCompositionCategories,
    IBodyCompositionCategory
} from '../../services/bodyCompositionCategories.service';
import AddBodyComposition from "./AddBodyComposition";
import Title from "../Title/Title";
import Delete from "../Form/Delete";
import * as dayjs from "dayjs";
import PaginatedTable from "../Table/PaginatedTable";
import SetCategories from "./SetCategories";

const Body = () => {
    const [bodyCompositionCategories, setBodyCompositionCategories] = useState<IBodyCompositionCategory[]>([])
    const [bodyCompositions, setBodyCompositions] = useState<IBodyComposition[]>([])

    const [bodyCompositionCategoriesLoading, setBodyCompositionCategoriesLoading] = useState<boolean>(true)
    const [bodyCompositionsLoading, setBodyCompositionsLoading] = useState<boolean>(true)

    useEffect(() => {
        getBodyCompositionCategories()
            .then((bodyCompositionCategories: IBodyCompositionCategory[]) =>
                setBodyCompositionCategories(bodyCompositionCategories)
            )
            .catch((error: Error) =>
                alert(error.message)
            )
            .finally(() =>
                setBodyCompositionCategoriesLoading(false)
            )

        getBodyComposition()
            .then((bodyCompositions: IBodyComposition[]) =>
                setBodyCompositions(
                    bodyCompositions
                        .sort((bodyCompositionA: IBodyComposition, bodyCompositionB: IBodyComposition) =>
                            dayjs(bodyCompositionA.date).isAfter(dayjs(bodyCompositionB.date)) ? 1 : -1
                        ))
            )
            .catch((error: Error) =>
                alert(error.message)
            )
            .finally(() =>
                setBodyCompositionsLoading(false)
            )
    }, [])

    const handleDeleteCategory = (bodyCompositionCategory: IBodyCompositionCategory) =>
        deleteBodyCompositionCategory(bodyCompositionCategory)
            .then((bodyCompositionCategoryToDelete: IBodyCompositionCategory) => {
                setBodyCompositionCategories(
                    bodyCompositionCategories.filter((bodyCompositionCategory: IBodyCompositionCategory) =>
                        bodyCompositionCategory.body_composition_category_id !== bodyCompositionCategoryToDelete.body_composition_category_id
                    )
                )
            })
            .catch((error: Error) =>
                alert(error.message)
            )

    const handleDeleteBodyComposition = (bodyCompositionId: number) =>
        deleteBodyComposition(bodyCompositions.find((bodyComposition: IBodyComposition) =>
            bodyComposition.body_composition_id === bodyCompositionId
        ))
            .then((bodyCompositionToDelete: IBodyComposition) => {
                setBodyCompositions(
                    bodyCompositions.filter((bodyComposition: IBodyComposition) =>
                        bodyComposition.body_composition_id !== bodyCompositionToDelete.body_composition_id
                    )
                )
            })
            .catch((error: Error) =>
                alert(error.message)
            )

    return <Container maxWidth="lg" sx={{mt: 4, mb: 4}}>
        <Grid container spacing={3}>
            <SetCategories bodyCompositionCategories={bodyCompositionCategories}/>
            <Grid item xs={12}>
                <AddBodyComposition
                    bodyCompositionCategoriesLoading={bodyCompositionCategoriesLoading}
                    bodyCompositionCategories={bodyCompositionCategories}
                    onAddBodyComposition={(bodyComposition: IBodyComposition) =>
                        setBodyCompositions(
                            [...bodyCompositions, bodyComposition].sort((a, b) =>
                                new Date(a.date).getTime() - new Date(b.date).getTime())
                        )
                    }
                    onAddBodyCompositionCategory={(bodyCompositionCategory: IBodyCompositionCategory) =>
                        setBodyCompositionCategories([...bodyCompositionCategories, bodyCompositionCategory])
                    }
                />
            </Grid>
            {
                (bodyCompositionCategoriesLoading && <CircularProgress/>) ||
                bodyCompositionCategories.map((bodyCompositionCategory: IBodyCompositionCategory) => {
                        const title = `${bodyCompositionCategory.title} (${bodyCompositionCategory.units?.title})`
                        return <Grid
                            key={bodyCompositionCategory.body_composition_category_id}
                            item
                            xs={12}
                            md={6}>
                            {
                                (bodyCompositionsLoading && <CircularProgress/>) ||
                                <Paper sx={{p: 2, display: 'flex', flexDirection: 'column'}}>
                                    <Box
                                        component={"div"}
                                        sx={{display: 'flex', flexDirection: 'row', justifyContent: 'space-between'}}
                                    >
                                        <Title>{title}</Title>
                                        <Delete onDelete={
                                            () =>
                                                handleDeleteCategory(bodyCompositionCategory)
                                        }/>
                                    </Box>
                                    <TimeLineChart
                                        title={title}
                                        data={
                                            bodyCompositions.filter((bodyComposition: IBodyComposition) =>
                                                bodyComposition.body_composition_category_id === bodyCompositionCategory.body_composition_category_id
                                            ).map((bodyComposition: IBodyComposition) =>
                                                ({
                                                    x: dayjs(bodyComposition.date).format('DD/MM/YYYY'),
                                                    y: Math.round(Number(bodyComposition.value) * 10) / 10
                                                })
                                            )
                                        }
                                        xLabel={'Time'}
                                        yLabel={title}/>
                                    <Accordion sx={{
                                        marginTop: '2em',
                                    }}>
                                        <AccordionSummary
                                            expandIcon={<ExpandMoreIcon/>}
                                            aria-controls="panel1a-content"
                                            id="panel1a-header"
                                        >
                                            <Typography>Records</Typography>
                                        </AccordionSummary>
                                        <AccordionDetails>
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
                                                        label: 'Delete',
                                                        format: (value: number) =>
                                                            <Delete onDelete={
                                                                () =>
                                                                    handleDeleteBodyComposition(value)
                                                            }/>
                                                    }
                                                ]}
                                                rows={
                                                    bodyCompositions.filter((bodyComposition: IBodyComposition) =>
                                                        bodyComposition.body_composition_category_id === bodyCompositionCategory.body_composition_category_id
                                                    ).map((bodyComposition: IBodyComposition) =>
                                                        ({
                                                            ...bodyComposition,
                                                            value: bodyComposition.value + bodyComposition.body_composition_categories.units.title
                                                        })
                                                    )
                                                }/>
                                        </AccordionDetails>
                                    </Accordion>
                                </Paper>
                            }
                        </Grid>
                    }
                )
            }
        </Grid>
    </Container>
}

export default Body
