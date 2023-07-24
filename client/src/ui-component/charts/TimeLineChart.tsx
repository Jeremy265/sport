import Chart from "react-apexcharts"
import Loading from "../Loading";
import CardSkeleton from "../Skeleton/CardSkeleton";

interface Props<T> {
    dates: string[]
    data: { name?: string, data: T[] }[]
    status?: { value: string, label: string }[]
    isLoading?: boolean
}

const TimeLineChart = <T, >({dates, data, status, isLoading = false}: Props<T>) => {
    const chartData: any = {
        height: 300,
        series: data,
        options: {
            chart: {
                zoom: {
                    enabled: false
                }
            },
            responsive: [
                {
                    breakpoint: 480,
                    options: {
                        legend: {
                            position: 'bottom',
                            offsetX: -10,
                            offsetY: 0
                        }
                    }
                }
            ],
            xaxis: {
                type: 'category',
                categories: dates
            },
            dataLabels: {
                enabled: true
            }
        },
    }

    return (
        <Loading
            isLoading={isLoading}
            loadingElement={<CardSkeleton/>}
        >
            <Chart {...chartData} />
        </Loading>
    )
}

export default TimeLineChart