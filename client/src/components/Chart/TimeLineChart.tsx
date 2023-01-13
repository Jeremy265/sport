import * as React from 'react';
import {CartesianGrid, Label, Legend, Line, LineChart, ResponsiveContainer, Tooltip, XAxis, YAxis} from 'recharts';

interface Props {
    title: string;
    data: { x: any, y: any }[];
    xLabel: string;
    yLabel: string;
}

const TimeLineChart = ({
                        title,
                        data,
                        xLabel,
                        yLabel
                    }: Props) => {

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
                    dataKey="y"
                    type="number"
                    tickCount={3}
                    domain={['dataMin - 5', 'dataMax + 5']}
                />
                <Tooltip/>
                <Legend
                    verticalAlign="top"
                    height={50}
                />
                <Line
                    type="monotone"
                    dataKey="y"
                    stroke="#8884d8"
                    name={title}
                />
            </LineChart>
        </ResponsiveContainer>
    );
}

export default TimeLineChart