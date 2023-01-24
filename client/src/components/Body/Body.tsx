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
import {getBodyCompositionCategories, IBodyCompositionCategory} from '../../services/bodyCompositionCategories.service';
import AddBodyComposition from "./AddBodyComposition";
import Title from "../Title/Title";
import Delete from "../Form/Delete";
import * as dayjs from "dayjs";
import PaginatedTable from "../Table/PaginatedTable";
import SetCategories from "./SetCategories";
import {BodyCompositionsByDate, groupBodyCompositionsByDate, sortObjectsByKey} from "../../utils/utils";
import MultipleTimeLineChart from "../Chart/MultipleTimeLineChart";
import MultipleSelect from "../Form/MultipleSelect";

const Body = () => {
    const [bodyCompositionCategories, setBodyCompositionCategories] = useState<IBodyCompositionCategory[]>([])
    const [bodyCompositionCategoriesForMainChart, setBodyCompositionCategoriesForMainChart] = useState<IBodyCompositionCategory[]>([])
    const [bodyCompositions, setBodyCompositions] = useState<IBodyComposition[]>([])

    const [bodyCompositionCategoriesLoading, setBodyCompositionCategoriesLoading] = useState<boolean>(true)
    const [bodyCompositionsLoading, setBodyCompositionsLoading] = useState<boolean>(true)

    useEffect(() => {
        getBodyCompositionCategories()
            .then((bodyCompositionCategories: IBodyCompositionCategory[]) => {
                setBodyCompositionCategories(bodyCompositionCategories)
            })
            .catch((error: Error) =>
                alert(error.message)
            )
            .finally(() =>
                setBodyCompositionCategoriesLoading(false)
            )

        getBodyComposition()
            .then((bodyCompositions: IBodyComposition[]) =>
                setBodyCompositions(sortObjectsByKey({array: bodyCompositions, key: 'date', dataType: 'date'}))
            )
            .catch((error: Error) =>
                alert(error.message)
            )
            .finally(() =>
                setBodyCompositionsLoading(false)
            )
    }, [])

    useEffect(() => {
        setBodyCompositionCategoriesForMainChart(getVisibleBodyCompositionCategories())
    }, [bodyCompositionCategories])

    const getVisibleBodyCompositionCategories = (): IBodyCompositionCategory[] =>
        bodyCompositionCategories.filter((bodyCompositionCategory: IBodyCompositionCategory) =>
            bodyCompositionCategory.visible
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
            <Grid item xs={12} textAlign={"right"}>
                <SetCategories
                    bodyCompositionCategories={bodyCompositionCategories}
                    onSaveVisibilities={
                        (newBodyCompositionCategories: IBodyCompositionCategory[]) =>
                            setBodyCompositionCategories(newBodyCompositionCategories)
                    }
                />
            </Grid>
            <Grid item xs={12}>
                <Grid item xs={12}>
                    <MultipleSelect
                        title="Body composition categories on chart"
                        data={
                            getVisibleBodyCompositionCategories().map((visibleBodyCompositionCategory: IBodyCompositionCategory) =>
                                ({
                                    ...visibleBodyCompositionCategory,
                                    selected: bodyCompositionCategoriesForMainChart.find((bodyCompositionCategoryForMainChart: IBodyCompositionCategory) =>
                                        bodyCompositionCategoryForMainChart.body_composition_category_id === visibleBodyCompositionCategory.body_composition_category_id
                                    ) !== undefined
                                })
                            )
                        }
                        titleKey="title"
                        onChange={(bodyCompositionCategories: IBodyCompositionCategory[]) => {
                            setBodyCompositionCategoriesForMainChart(bodyCompositionCategories)
                        }}
                    />
                    <MultipleTimeLineChart
                        title="Body compositions"
                        data={
                            Object.entries(groupBodyCompositionsByDate(
                                bodyCompositions.filter((bodyComposition: IBodyComposition) =>
                                    bodyCompositionCategoriesForMainChart.find((bodyCompositionCategoryForMainChart: IBodyCompositionCategory) =>
                                        bodyCompositionCategoryForMainChart.body_composition_category_id === bodyComposition.body_composition_category_id
                                    ) !== undefined
                                )
                            )).map(([date, body_compositions]) => {
                                const obj = {
                                    x: date
                                }
                                body_compositions.map((bodyComposition: IBodyComposition) =>
                                    Object.assign(obj, {
                                            [bodyComposition.body_composition_categories.title]: bodyComposition.value
                                        }
                                    )
                                )
                                return obj
                            })
                        }
                        keys={
                            bodyCompositionCategoriesForMainChart.map((bodyCompositionCategoryForMainChart: IBodyCompositionCategory) =>
                                ({
                                    title: bodyCompositionCategoryForMainChart.title,
                                    unit: bodyCompositionCategoryForMainChart.units.title
                                })
                            )
                        }
                        xLabel="Time"
                        yLabel="Value"
                    />
                </Grid>
                <AddBodyComposition
                    bodyCompositionCategoriesLoading={bodyCompositionCategoriesLoading}
                    bodyCompositionCategories={bodyCompositionCategories}
                    onAddBodyComposition={(bodyComposition: IBodyComposition) =>
                        setBodyCompositions(sortObjectsByKey({array: [...bodyCompositions, bodyComposition], key: 'date', dataType: 'date'}))
                    }
                    onAddBodyCompositionCategory={(bodyCompositionCategory: IBodyCompositionCategory) =>
                        setBodyCompositionCategories([...bodyCompositionCategories, bodyCompositionCategory])
                    }
                />
            </Grid>
            {
                (bodyCompositionCategoriesLoading && <CircularProgress/>) ||
                getVisibleBodyCompositionCategories()
                    .map((bodyCompositionCategory: IBodyCompositionCategory) => {
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
                                            {/*<Delete onDelete={*/}
                                            {/*    () =>*/}
                                            {/*        handleDeleteCategory(bodyCompositionCategory)*/}
                                            {/*}/>*/}
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
