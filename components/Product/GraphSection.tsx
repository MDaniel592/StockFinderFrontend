import type { ChartArea, ChartData } from 'chart.js';
import { CategoryScale, Chart as ChartJS, Legend, LineController, LineElement, LinearScale, PointElement, Title, Tooltip } from 'chart.js';
import ChartReact from "models/ChartReact";
import { useEffect, useRef, useState } from 'react';
import { Chart } from 'react-chartjs-2';

ChartJS.register(CategoryScale, LineController, LinearScale, PointElement, LineElement, Title, Tooltip, Legend);
ChartJS.defaults.color = "#FFFFFF";

// const colors = ['cyan', 'green', 'fuchsia', 'orange', 'white', 'yellow', 'lime', 'blue', 'teal', 'red', 'purple'];
const colors = ['red', 'orange', 'yellow', 'lime', 'green', 'teal', 'blue', 'purple'];

function getRandomElementFromArray(arr: string[]) {
    return arr[Math.floor(Math.random() * arr.length)];
}

function createGradient(ctx: CanvasRenderingContext2D, area: ChartArea) {
    const colorStart = getRandomElementFromArray(colors);
    const colorMid = getRandomElementFromArray(
        colors.filter(color => color !== colorStart)
    );
    const colorEnd = getRandomElementFromArray(
        colors.filter(color => color !== colorStart && color !== colorMid)
    );

    const gradient = ctx.createLinearGradient(0, area.bottom, 0, area.top);

    gradient.addColorStop(0, colorStart);
    gradient.addColorStop(0.5, colorMid);
    gradient.addColorStop(1, colorEnd);

    return gradient;
}

export default function GraphSection({ historicalData }: { historicalData: ChartReact }) {
    const [viewport, setViewport] = useState({ width: 0, height: 0 });

    try {
        if (Object.keys(historicalData).length == 0) return <></>
    } catch {
        return <></>
    }

    const chartRef = useRef<ChartJS>(null);
    const [chartData, setChartData] = useState<ChartData<'bar'>>({ datasets: [], });

    const options = {
        responsive: true,
        backgroundColor: '#ff0000',
        scales: {
            y: {
                ticks: {
                    callback: function (value: string | number) { return value + ' €'; }
                }
            }
        },
        plugins: {
            tooltip: {
                callbacks: {
                    label: function (context: any) {
                        let label = context.dataset.label || '';
                        if (label) { label += ': '; }
                        if (context.parsed.y !== null) {
                            label += new Intl.NumberFormat('es-ES', { style: 'currency', currency: 'EUR' }).format(context.parsed.y);
                        }
                        return label;
                    }
                }
            },
            legend: { position: 'bottom' as const },
            title: {
                display: true,
                font: { size: 16 },
                text: 'Historial de precios',
            },
        },
    };

    const data: any = historicalData ? { labels: historicalData.labels, datasets: historicalData.datasets } : null
    if (data === null) return <></>


    useEffect(() => {
        const chart = chartRef.current;
        if (!chart) return;

        const chartData = {
            ...data,
            datasets: data.datasets.map(function (dataset: Object) {
                let colorSelected = createGradient(chart.ctx, chart.chartArea)
                return {
                    ...dataset,
                    borderColor: colorSelected,
                    backgroundColor: colorSelected,
                    pointHoverRadius: 8,
                }
            }),
        };
        setChartData(chartData);

        const handleResize = () => {
            setViewport({ width: window.innerWidth, height: window.innerHeight });
            chart.resize();
        };
        handleResize();
        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);


    return (
        <section className="hidden lg:block mx-auto lg:w-3/5 mt-2 lg:mt-8">
            <Chart ref={chartRef} type='line' data={chartData} options={options} />
        </section>
    );
}
