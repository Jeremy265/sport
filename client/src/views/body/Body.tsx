import {Stack} from "@mui/material";
import {useEffect, useState} from "react";
import {getBodyCompositions, IBodyComposition} from "../../services/bodyCompositions.service";
import TimeLineChart from "../../ui-component/charts/TimeLineChart";
import {extractDistinctDatesString} from "../../utils/date.utils";
import {getTimeLineChartDataFromBodyCompositions} from "../../utils/chart.utils";
import {removeObjectOfArray, sortObject, updateObjectOfArray} from "../../utils/object.utils";
import MainCard from "../../ui-component/cards/MainCard";
import BodyCompositionForm from "../../ui-component/forms/customforms/BodyCompositionForm";
import {useDispatch} from "react-redux";
import BodyCompositionCategories from "./BodyCompositionCategories";
import Loading from "../../ui-component/Loading";
import {setMessage} from "../../store/slices/messageSlice";
import config from "../../config"
import CustomRadioGroup from "../../ui-component/forms/customfields/CustomRadioGroup";
import * as React from "react";

const Body = () => {

    const dispatch = useDispatch()

    const [bodyCompositions, setBodyCompositions] = useState<IBodyComposition[]>([])
    const [bodyCompositionsLoading, setBodyCompositionsLoading] = useState<boolean>(true)

    const handleCreateBodyComposition = (bodyComposition: IBodyComposition) =>
        setBodyCompositions(sortObject({array: [...bodyCompositions, bodyComposition], key: 'date', dataType: 'date'}))

    const handleUpdateBodyComposition = (bodyCompositionToUpdate: IBodyComposition) =>
        setBodyCompositions(updateObjectOfArray(bodyCompositionToUpdate, 'body_composition_id', bodyCompositions))

    const handleDeleteBodyComposition = (bodyCompositionToDelete: IBodyComposition) =>
        setBodyCompositions(removeObjectOfArray(bodyCompositionToDelete, 'body_composition_id', bodyCompositions))

    useEffect(() => {
        getBodyCompositions()
            .then((bodyCompositions: IBodyComposition[]) =>
                setBodyCompositions(sortObject({array: bodyCompositions, key: 'date', dataType: 'date'}))
            )
            .catch((error: Error) =>
                dispatch(setMessage({text: error.message, severity: 'error'}))
            )
            .finally(() =>
                setBodyCompositionsLoading(false)
            )
    }, [])

    return <Stack spacing={config.gridSpacing}>
        <MainCard title="Add body composition">
            <BodyCompositionForm
                initialValues={{
                    date: new Date(),
                    body_composition_category_id: undefined,
                    body_composition_categories: undefined,
                    value: undefined
                }}
                handleResponse={handleCreateBodyComposition}/>
        </MainCard>
        <div>
            <Loading isLoading={bodyCompositionsLoading}>
                <BodyCompositionCategories
                    bodyCompositions={bodyCompositions}
                    onUpdate={handleUpdateBodyComposition}
                    onDelete={handleDeleteBodyComposition}
                />
            </Loading>
        </div>
    </Stack>
}

export default Body