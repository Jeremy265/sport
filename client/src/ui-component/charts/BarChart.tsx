import Chart from "react-apexcharts"
import Loading from "../Loading";
import CardSkeleton from "../Skeleton/CardSkeleton";

interface Props<T> {
    categories: string[]
    data: { name?: string, data: T[] }[]
    isLoading: boolean
    status?: { value: string, label: string }[]
}

const BarChart = <T, >({categories, data, isLoading}: Props<T>) => {
    const chartData: any = {
        height: 300,
        type: 'bar',
        options: {
            chart: {
                id: 'bar-chart',
                stacked: true,
                toolbar: {
                    show: true
                },
                zoom: {
                    enabled: true
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
            plotOptions: {
                bar: {
                    horizontal: false,
                    columnWidth: '50%'
                }
            },
            xaxis: {
                type: 'category',
                categories: categories
            },
            legend: {
                show: true,
                fontSize: '14px',
                fontFamily: `'Roboto', sans-serif`,
                position: 'bottom',
                offsetX: 20,
                labels: {
                    useSeriesColors: true
                },
                markers: {
                    width: 16,
                    height: 16,
                    radius: 5
                },
                itemMargin: {
                    horizontal: 15,
                    vertical: 8
                }
            },
            fill: {
                type: 'solid'
            },
            dataLabels: {
                enabled: true
            },
            grid: {
                show: true
            }
        },
        series: data
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

export default BarChart