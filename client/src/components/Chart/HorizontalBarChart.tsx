import * as React from 'react';
import {
    Bar,
    BarChart,
    CartesianGrid,
    Label,
    Legend,
    Line,
    LineChart,
    ResponsiveContainer,
    Tooltip,
    XAxis,
    YAxis
} from 'recharts';

interface Props {
    data: { x: any, y: any }[];
    xLabel: string;
    yLabel: string;
}

const CustomBarChart = ({
                            data,
                            xLabel,
                            yLabel
                        }: Props) => {

    return (
        <ResponsiveContainer width="100%" height={300}>
            <BarChart
                data={data}
                margin={{
                    top: 20,
                    right: 20,
                    left: 20,
                    bottom: 20,
                }}
                layout="vertical"
            >
                <CartesianGrid/>
                <XAxis
                    dataKey={"y"}
                    type="number"
                    label={
                        <Label
                            value={xLabel}
                            position="bottom"/>}
                />
                <YAxis
                    dataKey={"x"}
                    type="category"
                />
                <Tooltip/>
                <Legend
                    verticalAlign="top"
                    height={50}
                />
                <Bar name={xLabel} dataKey="y" fill="#8884d8"/>
            </BarChart>
        </ResponsiveContainer>
    );
}

export default CustomBarChart