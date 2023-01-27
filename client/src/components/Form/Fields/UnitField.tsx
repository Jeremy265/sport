import * as React from "react"
import {ReactElement, useEffect, useState} from "react"
import {createUnit, getUnits, IUnit} from "../../../services/units.service"
import {AutocompleteRenderInputParams, TextField} from "@mui/material"
import CreatableAutoComplete from "./CreatableAutoComplete"
import {removeAccentsAndLower} from "../../../utils/utils"
import CustomTextField from "./CustomTextField"

interface Props {
    id: string
    onChange?: (unit: IUnit) => void
}

const UnitField = ({id, onChange}: Props) => {

    const [units, setUnits] = useState<IUnit[]>([])
    const [unitsLoading, setUnitsLoading] = useState<boolean>(true)

    useEffect(() => {
        getUnits()
            .then((units: IUnit[]) => {
                setUnits(units)
            })
            .catch((error: Error) => {
                alert(error.message)
            })
            .finally(() =>
                setUnitsLoading(false)
            )
    }, [])

    return <CreatableAutoComplete<IUnit>
        id={id}
        itemName="Unit"
        loading={unitsLoading}
        options={units}
        getOptionByInput={(title: string) =>
            units.find((unit: IUnit) => unit.title === title)
        }
        getNewOption={(title: string = '') => ({
            title: title
        })}
        isNewOption={(option: IUnit) =>
            units.find((unit: IUnit) =>
                unit.title === option.title)
            === undefined
        }
        onSubmit={(option: IUnit) =>
            createUnit({
                ...option
            }).then((unit: IUnit) => {
                return unit
            }).catch((error: Error) => {
                alert(error)
            })
        }
        onChange={(option: IUnit) =>
            onChange(option)
        }
        groupBy={(unit: IUnit) =>
            removeAccentsAndLower(unit.title[0]).toUpperCase()
        }
        getOptionLabel={(unit: IUnit | string) =>
            typeof unit === 'string' ? unit : unit.title
        }
        renderInput={(params: AutocompleteRenderInputParams): ReactElement =>
            <TextField {...params} label="Unit"/>}
        formElements={[
            <CustomTextField id="title" label="Title" autoFocus={true}/>
        ]}
    />
}

export default UnitField