import * as React from 'react';
import {ChangeEvent, useState} from 'react';
import {Grid, InputAdornment, Paper, TextField} from "@mui/material";
import Button from "@mui/material/Button";
import Title from "../Title/Title";
import {createBodyComposition, IBodyComposition} from "../../services/bodyCompositions.service";
import PickBodyCompositionCategory from "../Pickers/PickBodyCompositionCategory";
import {IBodyCompositionCategory} from "../../services/bodyCompositionCategories.service";
import PickDate from "../Pickers/PickDate";

interface Props {
    bodyCompositionCategories: IBodyCompositionCategory[];
    bodyCompositionCategoriesLoading: boolean;
    onAddBodyComposition: (bodyComposition: IBodyComposition) => void;
    onAddBodyCompositionCategory: (bodyCompositionCategory: IBodyCompositionCategory) => void;
}

const AddBodyComposition = ({
                                bodyCompositionCategories,
                                bodyCompositionCategoriesLoading,
                                onAddBodyComposition,
                                onAddBodyCompositionCategory
                            }: Props) => {

    const [bodyComposition, setBodyComposition] = useState<IBodyComposition>({
        date: new Date(),
        value: undefined,
        body_composition_category_id: undefined,
        user_id: JSON.parse(localStorage.getItem('user'))?.user_id
    })

    const handleSaveBodyComposition = () => {
        createBodyComposition(bodyComposition)
            .then((bodyComposition: IBodyComposition) => {
                onAddBodyComposition(bodyComposition)
            })
            .catch((error: Error) => {
                alert(error.message)
            })
    }

    return <Paper sx={{p: 2}}>
        <Title>Add body composition</Title>
        <Grid container spacing={3}>
            <Grid item xs={12} sx={{mt: 2}}>
                <PickDate onChange={
                    (date: Date) =>
                        setBodyComposition({
                            ...bodyComposition,
                            date: date
                        })
                }/>
            </Grid>
            <Grid item xs={12} md={6}>
                <PickBodyCompositionCategory id="categories"
                                             loading={bodyCompositionCategoriesLoading}
                                             bodyCompositionCategories={bodyCompositionCategories}
                                             onAddBodyCompositionCategory={(bodyCompositionCategory: IBodyCompositionCategory) =>
                                                 onAddBodyCompositionCategory(bodyCompositionCategory)
                                             }
                                             onChange={(bodyCompositionCategory: IBodyCompositionCategory) => {
                                                 setBodyComposition({
                                                     ...bodyComposition,
                                                     body_composition_category_id: bodyCompositionCategory.body_composition_category_id,
                                                     body_composition_categories: bodyCompositionCategory
                                                 })
                                             }}/>
            </Grid>
            <Grid item xs={12} md={6}>
                <TextField
                    label="Value"
                    id="value"
                    fullWidth
                    disabled={!bodyComposition.body_composition_category_id}
                    InputProps={{
                        type: 'number',
                        inputMode: 'numeric',
                        endAdornment: <InputAdornment
                            position="end">{bodyComposition.body_composition_categories?.units?.title}</InputAdornment>,
                    }}
                    onChange={(event: ChangeEvent<HTMLInputElement>) => {
                        setBodyComposition({
                                ...bodyComposition,
                                value: Number(event.target.value)
                            }
                        )
                    }}
                />
            </Grid>
            <Grid item xs={12}>
                <Button
                    type="button"
                    fullWidth
                    variant="contained"
                    onClick={handleSaveBodyComposition}
                >
                    Save
                </Button>
            </Grid>
        </Grid>
    </Paper>
}

export default AddBodyComposition