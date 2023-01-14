import SettingsIcon from '@mui/icons-material/Settings';
import * as React from "react";
import {useState} from "react";
import CustomIconButton from "../Form/CustomIconButton";
import CustomModal from "../Modal/CustomModal";
import Title from "../Title/Title";
import {Autocomplete, Checkbox} from "@mui/material";
import TextField from "@mui/material/TextField";
import {IBodyCompositionCategory} from "../../services/bodyCompositionCategories.service";
import CheckBoxOutlineBlankIcon from '@mui/icons-material/CheckBoxOutlineBlank';
import CheckBoxIcon from '@mui/icons-material/CheckBox';

interface Props {
    visibleBodyCompositionCategories: IBodyCompositionCategory[];
    bodyCompositionCategories: IBodyCompositionCategory[];
}

const SetCategories = ({visibleBodyCompositionCategories, bodyCompositionCategories}: Props) => {
    const [open, setOpen] = useState<boolean>(false)
    console.log(bodyCompositionCategories)
    visibleBodyCompositionCategories.map((visibleBodyCompositionCategory: IBodyCompositionCategory) => {
        Object.assign(bodyCompositionCategories.find((bodyCompositionCategory) =>
            bodyCompositionCategory.body_composition_category_id === visibleBodyCompositionCategory.body_composition_category_id
        ), {visible: true})
    })
    console.log(bodyCompositionCategories)

    return (
        <>
            <CustomIconButton
                onClick={() => setOpen(true)}
                icon={<SettingsIcon/>}
                toolTip={"Settings"}
            />
            <CustomModal
                title={"Settings"}
                open={open}
                onClose={() => setOpen(false)}>
                Visible categories
                <Autocomplete
                    multiple
                    id="checkboxes-tags-demo"
                    options={bodyCompositionCategories}
                    disableCloseOnSelect
                    getOptionLabel={(bodyCompositionCategory: IBodyCompositionCategory) => bodyCompositionCategory.title}
                    renderOption={(props, option, { selected }) => (
                        <li {...props}>
                            <Checkbox
                                icon={<CheckBoxOutlineBlankIcon fontSize="small" />}
                                checkedIcon={<CheckBoxIcon fontSize="small" />}
                                style={{ marginRight: 8 }}
                                checked={selected}
                            />
                            {option.title}
                        </li>
                    )}
                    renderInput={(params) => (
                        <TextField {...params} label="Select categories" placeholder="Categories" />
                    )}
                />
            </CustomModal>
        </>


    )
}

export default SetCategories
