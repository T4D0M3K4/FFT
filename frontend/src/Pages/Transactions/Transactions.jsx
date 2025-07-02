import React, {useEffect, useState} from "react";
import api from "../../API/API";
import styles from './Transactions.module.css'

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
        <div className={styles.container}>
            <h2>Your Transactions</h2>
            <form className={styles.transactionsform} onSubmit={handleCreate}>
                <select className={styles.transactionsselect} value={newTransaction.TRANSACTION_TYPE} onChange={(e) => setNewTransaction({ ...newTransaction, TRANSACTION_TYPE: e.target.value })}>
                    <option value="Income">Income</option>
                    <option value="Expense">Expense</option>
                </select>
                <input className={styles.transactionsinput} type="number" placeholder="Amount" value={newTransaction.TRANSACTION_AMOUNT} onChange={(e) => setNewTransaction({ ...newTransaction, TRANSACTION_AMOUNT: e.target.value })} required />
                <input className={styles.transactionsinput} type="date" value={newTransaction.TRANSACTION_DATE} onChange={(e) => setNewTransaction({ ...newTransaction, TRANSACTION_DATE: e.target.value })} required />
                <input className={styles.transactionsinput} placeholder="Description" value={newTransaction.TRANSACTION_DESCRIPTION} onChange={(e) => setNewTransaction({ ...newTransaction, TRANSACTION_DESCRIPTION: e.target.value })} />
                <button className={styles.transactionsbutton} type="submit">Add Transaction</button>
            </form>

            <ul className={styles.transactionsul}>
                {transactions && transactions.map(transaction => 
                    <li className={styles.transactionsli} key={transaction.TRANSACTION_ID}>
                        {transaction.TRANSACTION_DATE}: {transaction.TRANSACTION_AMOUNT} ({transaction.TRANSACTION_TYPE})
                        <button className={styles.transactionsbutton} onClick={() => handleDelete(transaction.TRANSACTION_ID)}>Delete</button>
                    </li>
                )}
            </ul>
        </div>
    );
};

export default Transactions