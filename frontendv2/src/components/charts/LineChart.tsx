import React, { useEffect, useState } from "react";
import { Line } from 'react-chartjs-2';
import { Chart as ChartJS, TimeScale, LinearScale, LineElement, PointElement, Title, Legend, Tooltip } from 'chart.js';
import 'chartjs-adapter-date-fns';

import type { ChartData, ChartOptions } from 'chart.js';

interface IChartCurve {
    labels: any[],
    datas: any[],
    borderColor: string | undefined,
    label: string | undefined,
    opts: any,
}
type IDataset = Array<IChartCurve>;

ChartJS.register(
    LineElement,
    TimeScale,
    LinearScale,
    PointElement,
    Title, Legend, Tooltip
)
const LineChart: React.FC<{ dataset: IDataset }> = ({ dataset }): JSX.Element => {
    const [chartData, setChartData] = React.useState<ChartData<'line'> | undefined>({ labels: [], datasets: [] });

    useEffect(() => {
        if (!dataset) return;
        let labels: any[] = [];
        for (const dt of dataset) {
            for (const label of dt.labels) {
                const index = labels.indexOf(label);
                if (index < 0) labels.push(label);
            }
        }

        let datas: any[] = [];
        for (let datasetIndex = 0; datasetIndex < dataset.length; datasetIndex++) {
            const dt = dataset[datasetIndex];
            datas.push({
                data: Array.apply(null, Array(labels.length)).map(() => null),
                label: dt.label,
                borderColor: dt.borderColor,
                ...dt?.opts,
            })

            for (let i = 0; i < dt.labels.length; i++) {
                const label = dt.labels[i];
                const data = dt.datas[i];
                const index = labels.indexOf(label);
                datas[datasetIndex].data[index] = datas[datasetIndex].data[index] ? datas[datasetIndex].data[index] + data : data;
            }
        }
        console.log(labels);
        setChartData({
            labels, datasets: [...datas]
        });

    }, [dataset]);
    const options: ChartOptions<'line'> = {
        scales: {
            x: {
                type: 'time',
                suggestedMin: '2023-10-15',
                suggestedMax: '2024-02-27',
                time: {
                    unit: "day",
                    displayFormats: {
                        millisecond: 'MMM dd',
                        second: 'MMM dd',
                        minute: 'MMM dd',
                        hour: 'MMM dd',
                        day: 'MMM dd',
                        week: 'MMM dd',
                        month: 'MMM dd',
                        quarter: 'MMM dd',
                        year: 'MMM dd',
                    }
                }
            },
            y: {
                beginAtZero: true,
                ticks: { callback: (v: number) => (v + " €"), },
                suggestedMax: 20000
            },
        },
    };
    return (
        <div style={{ width: '80%', margin: 'auto', textAlign: 'center' }}>
            <Line data={chartData} options={options} />
        </div>
    )
}

export { LineChart }