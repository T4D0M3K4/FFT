import React, {useContext, useEffect, useState} from "react";
import api from "../../API/API";
import {Bar} from 'react-chartjs-2';
import { Chart as ChartJS, BarElement, CategoryScale, LinearScale, Tooltip, Legend } from "chart.js";
import { AuthContext } from "../../Auth/AuthContext/AuthContext";
import Footer from "../../Components/Footer/Footer";
import { Link } from "react-router-dom";
import './dashboard.css';

ChartJS.register(BarElement, CategoryScale, LinearScale, Tooltip, Legend);

const Dashboard = () => {

    const {user} = useContext(AuthContext);

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

    const dates = [...new Set(transactions.map(t => t.TRANSACTION_DATE))]
            .sort((a, b) => new Date(a) - new Date(b));

    const incomeByDate = dates.map(date => {
        const income = transactions.filter(t => t.TRANSACTION_DATE === date && t.TRANSACTION_TYPE === 'Income')
                                    .reduce((sum, t) => sum + t.TRANSACTION_AMOUNT, 0);
        return income;
    })

    const expenseByDate = dates.map(date => {
        const expense = transactions.filter(t => t.TRANSACTION_DATE === date && t.TRANSACTION_TYPE === 'Expense')
                                    .reduce((sum, t) => sum + t.TRANSACTION_AMOUNT, 0);
        return expense;
    })

    const transactionsData = {
        labels: dates,
        datasets: [
            {
                label: 'Income',
                data: incomeByDate,
                backgroundColor: 'green'
            },
            {
                label: 'Expense',
                data: expenseByDate,
                backgroundColor: 'red'
            }
        ]
    };

    const budgetsData = {
        labels: budgets.map(budget => `${budget.BUDGET_NAME}`),
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
        <>
        {user.USER_ROLE === 'Regular' && <div className="container">
            <h1>Dashboard</h1>
            <h2>Transactions</h2>
            <Bar data={transactionsData}/>
            <h2>Budgets</h2>
            <Bar data={budgetsData}/>
            <h2>Bills</h2>
            <Bar data={billsData}/>
        </div>}
        {user.USER_ROLE === 'Admin' && <div className="admin-container">
                    <h2>Admin Dashboard</h2>
                    <p>Manage administrative functions:</p>
                    <div className="card-links">
                        <button onClick={() => window.location.href = '/categories'}style={{marginRight:"80px"}} >
                            Manage categories
                        </button>
                        <button onClick={() => window.location.href = '/bills/upload'}style={{marginRight:"80px"}}>
                            Upload bills
                        </button>
                        <button onClick={() => window.location.href = '/users'} style={{marginRight:"80px"}}>
                            Manage users
                        </button>
                    </div>
                </div>}
                <Footer/>
        </>
    );
};

export default Dashboard