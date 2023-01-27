import * as React from 'react'
import {useEffect, useState} from 'react'
import {CircularProgress, Container, Grid} from '@mui/material'
import {
    deleteBodyComposition,
    getBodyComposition,
    IBodyComposition,
    updateBodyComposition
} from "../../services/bodyCompositions.service"
import {getBodyCompositionCategories, IBodyCompositionCategory} from '../../services/bodyCompositionCategories.service'
import AddBodyComposition from "./AddBodyComposition"
import SetCategories from "./SetCategories"
import {groupBodyCompositionsByDate, sortObjectsByKey} from "../../utils/utils"
import MultipleTimeLineChart from "../Chart/MultipleTimeLineChart"
import MultipleSelect from "../Form/MultipleSelect"
import BodyComposition from "./BodyComposition";
import CustomForm from "../Form/CustomForm";
import NumberField from "../Form/Fields/NumberField";
import CustomModal from "../Modal/CustomModal";
import BodyCompositionCategoryField from "../Form/Fields/BodyCompositionCategoryField";
import DateField from "../Form/Fields/DateField";

const Body = () => {
    const [formOpen, setFormOpen] = useState<boolean>(false)
    const [formValue, setFormValue] = useState<IBodyComposition>()

    const handleCloseForm = () => {
        setFormOpen(false)
        setFormValue(null)
    }

    const handleAddBodyCompositionCategory = (bodyCompositionCategory: IBodyCompositionCategory) =>
        setBodyCompositionCategories([...bodyCompositionCategories, bodyCompositionCategory])

    const handleUpdateBodyComposition = (bodyCompositionId: number) => {
        setFormOpen(true)
        setFormValue(
            bodyCompositions.find((bodyComposition: IBodyComposition) =>
                bodyComposition.body_composition_id === bodyCompositionId
            )
        )
    }

    const handleDeleteBodyComposition = (bodyCompositionId: number) =>
        deleteBodyComposition(bodyCompositions.find((bodyComposition: IBodyComposition) =>
            bodyComposition.body_composition_id === bodyCompositionId
        ))
            .then((bodyCompositionToDelete: IBodyComposition) =>
                setBodyCompositions(
                    bodyCompositions.filter((bodyComposition: IBodyComposition) =>
                        bodyComposition.body_composition_id !== bodyCompositionToDelete.body_composition_id
                    )
                )
            )
            .catch((error: Error) =>
                alert(error.message)
            )

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
                        setBodyCompositions(sortObjectsByKey({
                            array: [...bodyCompositions, bodyComposition],
                            key: 'date',
                            dataType: 'date'
                        }))
                    }
                    onAddBodyCompositionCategory={handleAddBodyCompositionCategory}
                />
            </Grid>
            {
                (bodyCompositionCategoriesLoading && <CircularProgress/>) ||
                getVisibleBodyCompositionCategories()
                    .map((bodyCompositionCategory: IBodyCompositionCategory) =>
                        <Grid
                            key={bodyCompositionCategory.body_composition_category_id}
                            item
                            xs={12}
                            md={6}>
                            {
                                (bodyCompositionsLoading && <CircularProgress/>) ||
                                <BodyComposition
                                    title={`${bodyCompositionCategory.title} (${bodyCompositionCategory.units?.title})`}
                                    bodyCompositions={bodyCompositions.filter((bodyComposition: IBodyComposition) =>
                                        bodyComposition.body_composition_category_id === bodyCompositionCategory.body_composition_category_id
                                    )}
                                    handleUpdateBodyComposition={handleUpdateBodyComposition}
                                    handleDeleteBodyComposition={handleDeleteBodyComposition}
                                />
                            }
                        </Grid>
                    )
            }
        </Grid>

        <CustomModal
            title={`Update Set`}
            open={formOpen}
            onClose={handleCloseForm}
        >
            <CustomForm<IBodyComposition>
                onChange={
                    (bodyComposition: IBodyComposition) =>
                        setFormValue({
                            ...Object.assign(formValue, bodyComposition),
                            body_composition_category_id: bodyComposition.body_composition_categories.body_composition_category_id
                        })
                }
                onSubmit={
                    (_: IBodyComposition) =>
                        updateBodyComposition(formValue)
                            .then((bodyCompositionToUpdate: IBodyComposition) => {
                                const newBodyCompositions = [...bodyCompositions]
                                const bodyCompositionIndex = newBodyCompositions.findIndex((bodyComposition: IBodyComposition) =>
                                    bodyComposition.body_composition_id === bodyCompositionToUpdate.body_composition_id
                                )
                                newBodyCompositions[bodyCompositionIndex] = bodyCompositionToUpdate
                                setBodyCompositions(newBodyCompositions)
                                handleCloseForm()
                            })
                            .catch((error: Error) =>
                                alert(error.message)
                            )
                }
                fields={[
                    <DateField id="date" defaultValue={formValue?.date}/>,
                    <BodyCompositionCategoryField id="body_composition_categories"
                                                  loading={bodyCompositionCategoriesLoading}
                                                  defaultValue={formValue?.body_composition_categories}
                                                  bodyCompositionCategories={bodyCompositionCategories}
                                                  onAddBodyCompositionCategory={handleAddBodyCompositionCategory}/>,
                    <NumberField id="value" label="Value" defaultValue={formValue?.value}
                                 unit={formValue?.body_composition_categories?.units?.title}/>
                ]}
            />
        </CustomModal>
    </Container>
}

export default Body
