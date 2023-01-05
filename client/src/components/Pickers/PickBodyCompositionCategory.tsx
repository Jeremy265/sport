import * as React from "react";
import {ReactElement} from "react";
import {AutocompleteRenderInputParams, TextField} from "@mui/material";
import CreatableAutoComplete from "../Form/CreatableAutoComplete";
import PickUnit from "./PickUnit";
import {
    createBodyCompositionCategory,
    IBodyCompositionCategory
} from "../../services/bodyCompositionCategories.service";
import {removeAccentsAndLower} from "../../utils/utils";

interface Props {
    id: string;
    onChange: (bodyCompositionCategory: IBodyCompositionCategory | null) => void;
    bodyCompositionCategories: IBodyCompositionCategory[];
    onAddBodyCompositionCategory: (bodyCompositionCategory: IBodyCompositionCategory) => void;
}

const PickBodyCompositionCategory = ({id, onChange, bodyCompositionCategories, onAddBodyCompositionCategory}: Props) => {

    return <CreatableAutoComplete<IBodyCompositionCategory>
        id={id}
        options={bodyCompositionCategories}
        getOptionByInput={(title: string) =>
            bodyCompositionCategories.find((bodyCompositionCategory: IBodyCompositionCategory) => bodyCompositionCategory.title === title)
        }
        getNewOption={(title: string = '') => ({
            title: title,
            unit_id: undefined
        })}
        isNewOption={(option: IBodyCompositionCategory) =>
            bodyCompositionCategories.find((bodyCompositionCategory: IBodyCompositionCategory) =>
                bodyCompositionCategory.title === option.title)
            === undefined
        }
        onSubmit={(option: IBodyCompositionCategory) =>
            createBodyCompositionCategory({
                ...option,
                unit_id: option.units.unit_id
            }).then((bodyCompositionCategory: IBodyCompositionCategory) => {
                onAddBodyCompositionCategory(bodyCompositionCategory)
                return bodyCompositionCategory
            }).catch((error: Error) => {
                alert(error)
            })
        }
        onChange={(option: IBodyCompositionCategory) =>
            onChange(option)
        }
        groupBy={(bodyCompositionCategory: IBodyCompositionCategory) =>
            removeAccentsAndLower(bodyCompositionCategory.title[0]).toUpperCase()
        }
        getOptionLabel={(bodyCompositionCategory: IBodyCompositionCategory | string) =>
            typeof bodyCompositionCategory === 'string' ? bodyCompositionCategory : bodyCompositionCategory.title
        }
        renderInput={(params: AutocompleteRenderInputParams): ReactElement =>
            <TextField {...params} label="Body composition category"/>}
        formElements={[
            <TextField
                autoFocus
                id="title"
                label="Title"
                type="text"
            />,
            <PickUnit id={"units"} onChange={() => {
            }}/>
        ]}
    />
}

export default PickBodyCompositionCategory