import * as React from "react";
import {useEffect, useState} from "react";
import {useDispatch} from "react-redux";
import {setMessage} from "../../store/slices/messageSlice";
import {Grid, Stack} from "@mui/material";
import config from "../../config";
import MainCard from "../../ui-component/cards/MainCard";
import CustomRadioGroup from "../../ui-component/forms/customfields/CustomRadioGroup";
import TimeLineChart from "../../ui-component/charts/TimeLineChart";
import {extractDistinctDatesString} from "../../utils/date.utils";
import {IChartDataV2} from "../../utils/chart.utils";

interface Props<T> {
    getData: () => Promise<T[]>
    getTimeLineChartData: (data: T[], dateFormat: string) => IChartDataV2[]
}

const Evolution = <T, >({getData, getTimeLineChartData}: Props<T>) => {
    const [data, setData] = useState<T[]>([])
    const [loading, setLoading] = useState<boolean>(true)
    const [groupBy, setGroupBy] = useState<string>('DD/MM/YYYY');

    const dispatch = useDispatch()

    useEffect(() => {
        getData()
            .then((data: T[]) =>
                setData(data)
            )
            .catch((error: Error) =>
                dispatch(setMessage({text: error.message, severity: 'error'}))
            )
            .finally(() =>
                setLoading(false)
            )
    }, [])

    const dates: string[] = extractDistinctDatesString(data, groupBy)
    const chartData: IChartDataV2[] = getTimeLineChartData(data, groupBy)

    return <Stack spacing={config.gridSpacing}>
        <MainCard title="Parameters">
            <CustomRadioGroup
                label="Group by"
                onChange={setGroupBy}
                initialValue={groupBy}
                values={[
                    {
                        label: 'Day',
                        value: 'DD/MM/YYYY'
                    },
                    {
                        label: 'Month',
                        value: 'MM/YYYY'
                    },
                    {
                        label: 'Year',
                        value: 'YYYY'
                    }
                ]}
            />
        </MainCard>
        <MainCard title="General Evolution">
            <TimeLineChart<number>
                dates={dates}
                data={chartData}
                isLoading={loading}
            />
        </MainCard>
        <div>
            <Grid container spacing={config.gridSpacing}>
                {
                    chartData.map((chartDatum: IChartDataV2) =>
                        <Grid key={chartDatum.name} item xs={12} md={6}>
                            <MainCard title={chartDatum.name}>
                                <TimeLineChart
                                    dates={dates.filter((date: string, index: number) => chartDatum.data[index] !== null)}
                                    data={[{
                                        name: chartDatum.name,
                                        data: chartDatum.data.filter((item: any) => item !== null)
                                    }]}
                                    isLoading={loading}
                                />
                            </MainCard>
                        </Grid>
                    )
                }
            </Grid>
        </div>
    </Stack>

}

export default Evolution