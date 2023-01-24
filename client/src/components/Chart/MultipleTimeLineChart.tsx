import * as React from 'react';
import {CartesianGrid, Label, Legend, Line, LineChart, ResponsiveContainer, Tooltip, XAxis, YAxis} from 'recharts';
import {sortObjectsByKey} from "../../utils/utils";

interface Props {
    title: string;
    data: { x: any, [key: string]: any }[];
    keys: { title: string, unit: string }[];
    xLabel: string;
    yLabel: string;
}

const TimeLineChart = ({
                           title,
                           data,
                           keys,
                           xLabel,
                           yLabel
                       }: Props) => {

    const colors = [
        "#ff7f50",
        "#6495ed",
        "#dc143c",
        "#006400",
        "#8b008b",
        "#ff1493",
        "#00ff7f",
        "#3cb371",
        "#ff00ff",
        "#800000",
        "#66cdaa",
        "#0000cd",
        "#ba55d3",
        "#9370db",
        "#3cb371",
        "#7b68ee",
        "#00fa9a",
        "#48d1cc",
        "#c71585",
        "#191970",
        "#f5fffa",
        "#ffe4e1",
        "#ffdead",
        "#000080",
        "#fdf5e6",
        "#808000",
        "#6b8e23",
        "#ffa500",
        "#ff4500",
        "#da70d6",
        "#eee8aa",
        "#98fb98"
    ];

    const units = Array.from(new Set(sortObjectsByKey({
        array: keys,
        key: 'title',
        asc: false
    }).map((key: { title: string, unit: string }) =>
        key.unit
    )))

    const unitLeft = units[0]
    const unitRight = units[1]

    return (
        <ResponsiveContainer width="100%" height={300}>
            <LineChart
                data={data}
                margin={{
                    top: 20,
                    right: 20,
                    left: 20,
                    bottom: 20,
                }}
            >
                <CartesianGrid/>
                <XAxis
                    dataKey="x"
                    label={
                        <Label
                            value={xLabel}
                            position="bottom"/>}
                />
                <YAxis
                    yAxisId={unitLeft}
                    label={{value: unitLeft, position: 'insideLeft'}}
                    domain={["dataMin-10", "dataMax+5"]}
                />
                {
                    unitRight && <YAxis
                        yAxisId={unitRight}
                        orientation="right"
                        label={{value: unitRight, position: 'insideRight'}}
                        domain={["dataMin-10", "dataMax+10"]}
                    />
                }
                <Tooltip/>
                <Legend
                    verticalAlign="top"
                    height={50}
                />
                {
                    sortObjectsByKey({
                        array: keys,
                        key: 'title',
                        asc: false
                    }).map((key: { title: string, unit: string }, index: number) => {
                            if ([unitLeft, unitRight].includes(key.unit))
                                return <Line
                                    key={key.title}
                                    yAxisId={key.unit}
                                    dataKey={key.title}
                                    type="monotone"
                                    name={`${key.title} (${key.unit})`}
                                    stroke={colors[index]}
                                />
                        }
                    )
                }

            </LineChart>
        </ResponsiveContainer>
    );
}

export default TimeLineChart