import React, {useEffect, useState} from "react";
import api from "../../API/API";
import {Bar} from 'react-chartjs-2';
import styles from './Dashboard.module.css';
import { Chart as ChartJS, BarElement, CategoryScale, LinearScale, Tooltip, Legend } from "chart.js";

ChartJS.register(BarElement, CategoryScale, LinearScale, Tooltip, Legend);

const Dashboard = () => {

    const [transactions, setTransactions] = useState([]);
    const [budgets, setBudgets] = useState([]);
    const [bills, setBills] = useState([]);

    useEffect(() => {
        api.get('/transactions')
            .then(res => setTransactions(res.data));
        api.get('/budgets')
            .then(res => setBudgets(res.data));
        api.get('/bills')
            .then(res => setBills(res.data));
    }, []);

    const filteredExpenseTransactions = transactions.filter(transaction => transaction.TRANSACTION_TYPE === 'Expense');
    const filteredIncomeTransactions = transactions.filter(transaction => transaction.TRANSACTION_TYPE === 'Income');

    const transactionsData = {
        labels: transactions.map(transaction => transaction.TRANSACTION_DATE),
        datasets: [
            {
                label: 'Amount of Income',
                data: filteredIncomeTransactions.map(transaction => transaction.TRANSACTION_AMOUNT),
                backgroundColor: 'green'
            },
            {
                label: 'Amount of Expense',
                data: filteredExpenseTransactions.map(transaction => transaction.TRANSACTION_AMOUNT),
                backgroundColor: 'red'
            }
        ]
    };

    const budgetsData = {
        labels: budgets.map(budget => `${budget.BUDGET_STARTDATE} - ${budget.BUDGET_ENDDATE}`),
        datasets: [
            {
                label: 'Amount',
                data: budgets.map(budget => budget.BUDGET_AMOUNT),
                backgroundColor: 'blue'
            }
        ]
    };

    const billsData = {
        labels: bills.map(bill => bill.BILL_DUEDATE),
        datasets: [
            {
                label: 'Amount',
                data: bills.map(bill => bill.BILL_AMOUNT),
                backgroundColor: 'lightblue'
            }
        ]
    };

    return(
        <div className={styles.dashboard}>
            <h2 className={styles.dashboardh2}>Dashboard</h2>
            <h3>Transactions</h3>
            <Bar data={transactionsData}/>
            <h3>Budgets</h3>
            <Bar data={budgetsData}/>
            <h3>Bills</h3>
            <Bar data={billsData}/>
        </div>
    );
};

export default Dashboard