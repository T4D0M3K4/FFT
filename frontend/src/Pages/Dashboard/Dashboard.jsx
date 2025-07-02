import React, {useEffect, useState} from "react";
import api from "../../API/API";
import {Bar} from 'react-chartjs-2';
import styles from './Dashboard.module.css';
import { Chart as ChartJS, BarElement, CategoryScale, LinearScale, Tooltip, Legend } from "chart.js";

ChartJS.register(BarElement, CategoryScale, LinearScale, Tooltip, Legend);

const Dashboard = () => {

    const [transactions, setTransactions] = useState([]);

    useEffect(() => {
        api.get('/transactions')
            .then(res => setTransactions(res.data));
    }, []);

    const chartData = {
        labels: transactions.map(transaction => transaction.TRANSACTION_DATE),
        datasets: [
            {
                label: 'Amount',
                data: transactions.map(transaction => transaction.TRANSACTION_AMOUNT),
                backgroundColor: transactions.map(transaction => transaction.TRANSACTION_TYPE === 'Income' ? 'green' : 'red')
            }
        ]
    };

    return(
        <div className={styles.dashboard}>
            <h2 className={styles.dashboardh2}>Dashboard</h2>
            <Bar data={chartData}/>
        </div>
    );
};

export default Dashboard