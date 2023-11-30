import React from 'react';
import { Line } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, LineElement, PointElement } from 'chart.js';
ChartJS.register(
    LineElement,
    CategoryScale,
    LinearScale,
    PointElement,
)
const TestComponent = () => {
    const data = {
        labels: ['Label 1', 'Label 2', 'Label 3', 'Label 4'],
        datasets: [
            {
                label: 'Bar Chart Example',
                data: [65, 59, 80, 81],
                backgroundColor: 'rgba(75,192,192,0.2)',
                borderColor: 'rgba(75,192,192,1)',
                borderWidth: 1,
                hoverBackgroundColor: 'rgba(75,192,192,0.4)',
                hoverBorderColor: 'rgba(75,192,192,1)',
            },
        ],
    };

    const options = {
        scales: {
            x: {
                type: 'category', // Specify that the x-axis is a category scale
                labels: ['Label 1', 'Label 2', 'Label 3', 'Label 4'],
            },
            y: {
                beginAtZero: true,
            },
        },
    };

    return (
        <div style={{ width: '80%', margin: 'auto', textAlign: 'center' }}>
            <h2>Bar Chart Example</h2>
            <Line data={data} options={options} />
        </div>
    );
};
export { TestComponent }