import * as React from 'react';
import {useEffect, useState} from 'react';
import OutlinedInput from '@mui/material/OutlinedInput';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import ListItemText from '@mui/material/ListItemText';
import Select, {SelectChangeEvent} from '@mui/material/Select';
import Checkbox from '@mui/material/Checkbox';
import {sortObjectsByKey} from "../../utils/utils";

type ExtendedT<T> = T & { selected: boolean }

interface Props<ExtendedT> {
    title: string;
    data: ExtendedT[];
    titleKey: string;
    onChange: (data: ExtendedT[]) => void;
}

const MultipleSelect = <T, >({title, data, titleKey, onChange}: Props<ExtendedT<T>>) => {

    const [selectedData, setSelectedData] = useState<string[]>([])

    useEffect(() => {
        setSelectedData(
            data.filter((datum: ExtendedT<T>) =>
                datum.selected
            ).map((datum: ExtendedT<T>) =>
                getTitle(datum)
            )
        )
    }, [data])

    const getTitle = (datum: ExtendedT<T>): string =>
        String(datum[titleKey as keyof T])

    return (
        <div>
            <FormControl sx={{m: 1, width: '100%'}}>
                <InputLabel>{title}</InputLabel>
                <Select
                    multiple
                    value={selectedData}
                    onChange={
                        (event: SelectChangeEvent<string[]>) => {
                            const value = event.target.value
                            const selectedItems: string[] = typeof value === 'string' ? value.split(',') : value
                            setSelectedData(selectedItems)
                            onChange(
                                data.filter((datum: ExtendedT<T>) =>
                                    selectedItems.includes(getTitle(datum))
                                )
                            )
                        }
                    }
                    input={<OutlinedInput label="Body composition categories on chart"/>}
                    renderValue={
                        (selectedData: string[]) =>
                            selectedData.join(', ')
                    }
                >
                    {
                        sortObjectsByKey({array: data, key: titleKey}).map((datum: ExtendedT<T>) => {
                                const title = getTitle(datum)
                                return <MenuItem
                                    key={title}
                                    value={title}>
                                    <Checkbox
                                        checked={
                                            selectedData.includes(title)
                                        }
                                    />
                                    <ListItemText primary={title}/>
                                </MenuItem>
                            }
                        )
                    }
                </Select>
            </FormControl>
        </div>
    );
}

export default MultipleSelect