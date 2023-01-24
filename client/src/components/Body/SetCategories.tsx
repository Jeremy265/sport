import SettingsIcon from '@mui/icons-material/Settings';
import * as React from "react";
import {useEffect, useState} from "react";
import CustomIconButton from "../Form/CustomIconButton";
import CustomModal from "../Modal/CustomModal";
import {Stack, Typography} from "@mui/material";
import {
    IBodyCompositionCategory,
    IBodyCompositionCategoryVisibility,
    updateVisibilities
} from "../../services/bodyCompositionCategories.service";
import Button from "@mui/material/Button";
import MultipleSelect from "../Form/MultipleSelect";

interface Props {
    bodyCompositionCategories: IBodyCompositionCategory[];
    onSaveVisibilities: (newBodyCompositionCategories: IBodyCompositionCategory[]) => void;
}

const SetCategories = ({bodyCompositionCategories, onSaveVisibilities}: Props) => {
    const [open, setOpen] = useState<boolean>(false)
    const [bodyCompositionCategoriesVisible, setBodyCompositionCategoriesVisible] = useState<IBodyCompositionCategory[]>([])

    useEffect(() => {
        setBodyCompositionCategoriesVisible(
            bodyCompositionCategories.filter((bodyCompositionCategory: IBodyCompositionCategory) =>
                bodyCompositionCategory.visible
            )
        )
    }, [bodyCompositionCategories])

    const handleSave = () => {
        updateVisibilities(bodyCompositionCategoriesVisible)
            .then((bodyCompositionCategoryVisibilities: IBodyCompositionCategoryVisibility[]) => {
                    onSaveVisibilities(bodyCompositionCategories.map((bodyCompositionCategory: IBodyCompositionCategory) =>
                        ({
                            ...bodyCompositionCategory,
                            visible: bodyCompositionCategoryVisibilities.find((bodyCompositionCategoryVisibility: IBodyCompositionCategoryVisibility) =>
                                bodyCompositionCategory.body_composition_category_id === bodyCompositionCategoryVisibility.body_composition_category_id) !== undefined
                        })
                    ))
                setOpen(false)
                }
            )
            .catch((error: Error) =>
                alert(error.message)
            )
    }

    return (
        <>
            <CustomIconButton
                onClick={() => setOpen(true)}
                icon={<SettingsIcon/>}
                toolTip={"Settings"}
                text={"Settings"}
            />
            <CustomModal
                title={"Settings"}
                open={open}
                onClose={() => setOpen(false)}>
                <Stack
                    direction="column"
                    justifyContent="space-evenly"
                    spacing={3}
                    mt={2}
                >
                    <Typography variant="h6" component="h1">
                        Visible categories
                    </Typography>
                    <MultipleSelect
                        title="Body composition categories on chart"
                        data={
                            bodyCompositionCategories.map((bodyCompositionCategory: IBodyCompositionCategory) =>
                                ({
                                    ...bodyCompositionCategory,
                                    selected: bodyCompositionCategoriesVisible.find((visibleBodyCompositionCategory: IBodyCompositionCategory) =>
                                        visibleBodyCompositionCategory.body_composition_category_id === bodyCompositionCategory.body_composition_category_id
                                    ) !== undefined
                                })
                            )
                        }
                        titleKey="title"
                        onChange={(bodyCompositionCategories: IBodyCompositionCategory[]) => {
                            setBodyCompositionCategoriesVisible(bodyCompositionCategories)
                        }}
                    />
                    <Button
                        type="button"
                        fullWidth
                        variant="contained"
                        onClick={handleSave}
                    >
                        Save
                    </Button>
                </Stack>
            </CustomModal>
        </>
    )
}

export default SetCategories
