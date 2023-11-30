import { Line } from 'react-chartjs-2';
import { Chart as ChartJS, TimeScale, LinearScale, LineElement, PointElement } from 'chart.js';
import { useEffect, useState } from 'react';
import 'chartjs-adapter-date-fns';
ChartJS.register(
    LineElement,
    TimeScale,
    LinearScale,
    PointElement,
)
const TransactionsChart = (props) => {
    const { transactions } = props;
    const dataSetOpts = {
        label: 'Transactions',
        backgroundColor: 'rgba(75,192,192,0.2)',
        borderColor: 'rgba(200,200,0,1)',
        borderWidth: 1,
        hoverBackgroundColor: 'rgba(75,192,192,0.4)',
        hoverBorderColor: 'rgba(75,192,192,1)',
    };
    const [data, setData] = useState({
        labels: [],
        datasets: [
            {
                data: [],
                ...dataSetOpts
            },
        ],
    });
    useEffect(() => {
        let labels = [];
        let datas = [];
        let datasApproved = [];
        let totalAmount = 0;
        let totalAmountApprouved = 0;
        if (!transactions) return;
        transactions.sort(function (a, b) {
            return new Date(a.date) - new Date(b.date);
        });
        for (const transaction of transactions) {
            const index = labels.indexOf(transaction.date);
            totalAmount += transaction.amount;
            totalAmountApprouved += transaction.approved ? transaction.amount : 0;
            if (index > 0) {
                datas[index] = totalAmount;
                datasApproved[index] = totalAmountApprouved;
            }
            else {
                labels.push(transaction.date);
                datas.push(totalAmount);
                datasApproved.push(totalAmountApprouved);
            }
        }
        setData({ labels, datasets: [{ data: datas, ...dataSetOpts }, { data: datasApproved, ...dataSetOpts, borderColor: 'rgba(10,250,10,1)' }] });
    }, [transactions])

    const options = {
        scales: {
            x: {
                type: 'time',
                suggestedMin: '2023-10-15',
                suggestedMax: '2024-02-27',
                time: {
                    unit: "day",
                    unitStepSize: 1000,
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
                title: "€",
                suggestedMax: 20000
            },
        },
    };

    return (
        <div style={{ width: '80%', margin: 'auto', textAlign: 'center' }}>
            <h2>Transactions</h2>
            <Line data={data} options={options} />
        </div>
    );
};
export { TransactionsChart }