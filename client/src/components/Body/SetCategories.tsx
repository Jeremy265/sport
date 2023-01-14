import SettingsIcon from '@mui/icons-material/Settings';
import * as React from "react";
import {ChangeEvent, useEffect, useState} from "react";
import CustomIconButton from "../Form/CustomIconButton";
import CustomModal from "../Modal/CustomModal";
import {Autocomplete, Checkbox} from "@mui/material";
import TextField from "@mui/material/TextField";
import {IBodyCompositionCategory, updateVisibilities} from "../../services/bodyCompositionCategories.service";
import CheckBoxOutlineBlankIcon from '@mui/icons-material/CheckBoxOutlineBlank';
import CheckBoxIcon from '@mui/icons-material/CheckBox';
import Button from "@mui/material/Button";

interface Props {
    bodyCompositionCategories: IBodyCompositionCategory[];
}

const SetCategories = ({bodyCompositionCategories}: Props) => {
    const [open, setOpen] = useState<boolean>(false)
    const [visibilities, setVisibilities] = useState<IBodyCompositionCategory[]>(bodyCompositionCategories)

    useEffect(() => {
        bodyCompositionCategories.map((bodyCompositionCategory: IBodyCompositionCategory) => {
                if (bodyCompositionCategory.visible)
                    setVisibilities([...visibilities, bodyCompositionCategory])
            }
        )
    }, [bodyCompositionCategories])

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
                    onChange={(event: ChangeEvent, value: any) => {
                        setVisibilities(value)
                    }}
                    value={visibilities}
                    getOptionLabel={(bodyCompositionCategory: IBodyCompositionCategory) => bodyCompositionCategory.title}
                    renderOption={(props, option, {selected}) => {
                        return (
                            <li key={option.title + option.body_composition_category_id} {...props}>
                                <Checkbox
                                    key={option.title + option.body_composition_category_id}
                                    icon={<CheckBoxOutlineBlankIcon fontSize="small"/>}
                                    checkedIcon={<CheckBoxIcon fontSize="small"/>}
                                    style={{marginRight: 8}}
                                    checked={selected}/>
                                {option.title}{option.body_composition_category_id}
                            </li>
                        )
                    }}
                    renderInput={(params) => (
                        <TextField {...params} label="Select categories" placeholder="Categories"/>
                    )}
                />
                <Button
                    type="button"
                    fullWidth
                    variant="contained"
                    onClick={() => updateVisibilities(visibilities)}
                >
                    Save
                </Button>
            </CustomModal>
        </>

    )
}

export default SetCategories
