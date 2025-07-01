import React from "react";

const Dashboard = () => {
    return(
        <div>
            <h2>Dashboard</h2>
            <p>Welcome to your Family Finance Tracker dashboard!</p>
            <ul>
                <li><a href="/transactions">View Transactions</a></li>
                <li><a href="/bills">View Bills</a></li>
                <li><a href="/budgets">View Budgets</a></li>
                <li><a href="/profile">Profile</a></li>
            </ul>
        </div>
    );
};

export default Dashboard