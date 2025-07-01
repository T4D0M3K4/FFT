import React, {useEffect, useState} from "react";
import api from "../../API/API";

const Transactions = () => {
    const [transactions, setTransactions] = useState([]);
    const [newTransaction, setNewTransaction] = useState({
            TRANSACTION_TYPE: 'Expense',
            TRANSACTION_AMOUNT: '',
            TRANSACTION_DATE: '',
            TRANSACTION_DESCRIPTION: '',
            CATEGORY_ID: 1,
            BUDGET_ID: 1
        });

    const loadTransactions = async () => {
        await api.get('/transactions')
            .then(res => setTransactions(res.data))
            .catch(err => console.error(err));
    }

    useEffect(() => {
        loadTransactions();
    }, []);

    const handleCreate = async (e) => {
        e.preventDefault();
        await api.post('/transactions', newTransaction);
        setNewTransaction({
            TRANSACTION_TYPE: 'Expense',
            TRANSACTION_AMOUNT: '',
            TRANSACTION_DATE: '',
            TRANSACTION_DESCRIPTION: '',
            CATEGORY_ID: 1,
            BUDGET_ID: 1
        });
        loadTransactions();
    };

    const handleDelete = async (id) => {
        await api.delete(`/transactions/${id}`);
        loadTransactions();
    }

    return(
        <div>
            <h2>Your Transactions</h2>
            <form onSubmit={handleCreate}>
                <select value={newTransaction.TRANSACTION_TYPE} onChange={(e) => setNewTransaction({ ...newTransaction, TRANSACTION_TYPE: e.target.value })}>
                    <option value="Income">Income</option>
                    <option value="Expense">Expense</option>
                </select>
                <input type="number" placeholder="Amount" value={newTransaction.TRANSACTION_AMOUNT} onChange={(e) => setNewTransaction({ ...newTransaction, TRANSACTION_AMOUNT: e.target.value })} required />
                <input type="date" value={newTransaction.TRANSACTION_DATE} onChange={(e) => setNewTransaction({ ...newTransaction, TRANSACTION_DATE: e.target.value })} required />
                <input placeholder="Description" value={newTransaction.TRANSACTION_DESCRIPTION} onChange={(e) => setNewTransaction({ ...newTransaction, TRANSACTION_DESCRIPTION: e.target.value })} />
                <button type="submit">Add Transaction</button>
            </form>

            <ul>
                {transactions && transactions.map(transaction => 
                    <li key={transaction.TRANSACTION_ID}>
                        {transaction.TRANSACTION_DATE}: {transaction.TRANSACTION_AMOUNT} ({transaction.TRANSACTION_TYPE})
                        <button onClick={() => handleDelete(transaction.TRANSACTION_ID)}>Delete</button>
                    </li>
                )}
            </ul>
        </div>
    );
};

export default Transactions