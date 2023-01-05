import * as React from "react";
import {ReactElement, useEffect, useState} from "react";
import {createUnit, getUnits, IUnit} from "../../services/units.service";
import {AutocompleteRenderInputParams, TextField} from "@mui/material";
import CreatableAutoComplete from "../Form/CreatableAutoComplete";
import {removeAccentsAndLower} from "../../utils/utils";

interface Props {
    id: string;
    onChange: (unit: IUnit | null) => void;
}

const PickUnit = ({id, onChange}: Props) => {

    const [units, setUnits] = useState<IUnit[]>([])

    useEffect(() => {
        getUnits()
            .then((units: IUnit[]) => {
                setUnits(units)
            }).catch((error: Error) => {
            alert(error.message)
        })
    }, [])

    return <CreatableAutoComplete<IUnit>
        id={id}
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
            <TextField
                autoFocus
                id="title"
                label="Title"
                type="text"
            />
        ]}
    />
}

export default PickUnit