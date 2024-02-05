import { useEffect, useState } from 'react';

import { paliers } from "./BaseDatas";
import { LineChart } from "./LineChart";

const TransactionsChart = (props) => {
    const { transactions, campagne } = props;

    const [data, setData] = useState();
    const startDate = "2023-10-15";
    const endDate = "2024-03-01";

    useEffect(() => {
        if (!transactions) return;
        const dataset = []

        for (const palier of paliers[campagne ? campagne : "BDE"]) {
            dataset.push(
                {
                    label: palier.label,
                    borderColor: 'rgba(0,' + (0 + 200 * (dataset.length / paliers[campagne ? campagne : "BDE"].length)).toString() + ',' + (0 + 200 * (dataset.length / paliers[campagne ? campagne : "BDE"].length)).toString() + ',1)',
                    labels: [startDate, endDate],
                    datas: [0, palier.aimed],
                    opts: {
                        hidden: true,
                        spanGaps: true,
                    }
                }
            )
        }

        transactions.sort(function (a, b) {
            return new Date(a.date) - new Date(b.date);
        });

        const indexTr = dataset.push({
            label: "Transactions",
            borderColor: 'rgba(200,200,0,1)',
            labels: [],
            datas: [],
        })
        let totalAmount = 0;
        for (const tr of transactions) {
            totalAmount += tr.amount;
            const index = dataset[indexTr - 1].labels.indexOf(tr.date);

            if (index > 0) {
                dataset[indexTr - 1].datas[index] = totalAmount;
            } else {
                dataset[indexTr - 1].labels.push(tr.date);
                dataset[indexTr - 1].datas.push(totalAmount);
            }
        }

        const transactionsApproved = transactions.filter((tr) => (tr.approved));
        const indexTrApproved = dataset.push({
            label: "Transactions Approved",
            borderColor: 'rgba(0,200,0,1)',
            labels: [],
            datas: [],
        })
        totalAmount = 0;
        for (const tr of transactionsApproved) {
            totalAmount += tr.amount;
            const index = dataset[indexTrApproved - 1].labels.indexOf(tr.date);

            if (index > 0) {
                dataset[indexTrApproved - 1].datas[index] = totalAmount;
            } else {
                dataset[indexTrApproved - 1].labels.push(tr.date);
                dataset[indexTrApproved - 1].datas.push(totalAmount);
            }
        }
        console.log(dataset)
        setData(dataset);
    }, [transactions, campagne])

    return (
        <div style={{ width: '80%', margin: 'auto', textAlign: 'center' }}>
            <h2>Transactions</h2>
            <LineChart dataset={data} />
        </div>
    );
};
export { TransactionsChart }