import * as React from "react"
import {ReactElement} from "react"
import {AutocompleteRenderInputParams, TextField} from "@mui/material"
import CreatableAutoComplete from "./CreatableAutoComplete"
import UnitField from "./UnitField"
import {
    createBodyCompositionCategory,
    IBodyCompositionCategory
} from "../../../services/bodyCompositionCategories.service"
import {removeAccentsAndLower} from "../../../utils/utils"
import CustomTextField from "./CustomTextField"

interface Props {
    id: string
    loading: boolean
    defaultValue?: IBodyCompositionCategory
    onChange?: (bodyCompositionCategory: IBodyCompositionCategory | null) => void
    bodyCompositionCategories: IBodyCompositionCategory[]
    onAddBodyCompositionCategory: (bodyCompositionCategory: IBodyCompositionCategory) => void
}

const BodyCompositionCategoryField = ({
                                          id,
                                          defaultValue,
                                          onChange,
                                          bodyCompositionCategories,
                                          loading,
                                          onAddBodyCompositionCategory
                                      }: Props) => {

    return <CreatableAutoComplete<IBodyCompositionCategory>
        id={id}
        defaultValue={defaultValue}
        itemName="Body Composition Category"
        loading={loading}
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
        onChange={
            (option: IBodyCompositionCategory) => {
                if (onChange)
                    onChange(option)
            }
        }
        groupBy={(bodyCompositionCategory: IBodyCompositionCategory) =>
            removeAccentsAndLower(bodyCompositionCategory.title[0]).toUpperCase()
        }
        getOptionLabel={(bodyCompositionCategory: IBodyCompositionCategory | string) =>
            typeof bodyCompositionCategory === 'string' ? bodyCompositionCategory : bodyCompositionCategory.title
        }
        renderInput={(params: AutocompleteRenderInputParams): ReactElement =>
            <TextField {...params} required label="Body composition category"/>}
        formElements={[
            <CustomTextField id="title" label="Title" autoFocus={true}/>,
            <UnitField id={"units"} onChange={() => {
            }}/>
        ]}
    />
}

export default BodyCompositionCategoryField