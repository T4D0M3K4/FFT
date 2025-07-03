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

    const [search, setSearch] = useState('');
    const [filters, setFilters] = useState({
        type: '',
        minAmount: '',
        startDate: '',
        endDate: ''
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
    };

    const filterTransactions = transactions.filter(transaction => {
        const matchesSearch = transaction.TRANSACTION_DESCRIPTION.toLowerCase().includes(search.toLowerCase());
        const matchesType = !filters.type || transaction.TRANSACTION_TYPE === filters.type;
        const matchesMin = !filters.minAmount || transaction.TRANSACTION_AMOUNT >= parseFloat(filters.minAmount);
        const matchesMax = !filters.maxAmount || transaction.TRANSACTION_AMOUNT <= parseFloat(filters.maxAmount);
        const matchesStart = !filters.startDate || transaction.TRANSACTION_DATE >= filters.startDate;
        const matchesEnd = !filters.endDate || transaction.TRANSACTION_DATE <= filters.endDate;

        return matchesSearch && matchesType && matchesMin && matchesMax && matchesStart && matchesEnd;
    });

    return(
        <div className='container'>
            <h2>Add New Transaction</h2>
            <form onSubmit={handleCreate}>

                <label htmlFor="type">Type:</label>
                <select id="type" value={newTransaction.TRANSACTION_TYPE} onChange={(e) => setNewTransaction({ ...newTransaction, TRANSACTION_TYPE: e.target.value })}>
                    <option value="Income">Income</option>
                    <option value="Expense">Expense</option>
                </select>

                <label htmlFor="amount">Amount:</label>
                <input id="amount" type="number" placeholder="Amount" value={newTransaction.TRANSACTION_AMOUNT} onChange={(e) => setNewTransaction({ ...newTransaction, TRANSACTION_AMOUNT: e.target.value })} required />

                <label htmlFor="categ">Category:</label>
                
                <label htmlFor="desc">Description:</label>
                <input id="desc" placeholder="Description" value={newTransaction.TRANSACTION_DESCRIPTION} onChange={(e) => setNewTransaction({ ...newTransaction, TRANSACTION_DESCRIPTION: e.target.value })} />

                <label htmlFor="tdate">Transaction Date:</label>
                <input id="tdate" type="date" value={newTransaction.TRANSACTION_DATE} onChange={(e) => setNewTransaction({ ...newTransaction, TRANSACTION_DATE: e.target.value })} required />
                <button type="submit">Add Transaction</button>
            </form><br /><hr />

            <h2>Search:</h2>
            <form>
                <input type="text" placeholder="Search by description" value={search} onChange={(e) => setSearch(e.target.value)}/>
                <select value={filters.type} onChange={(e) => setFilters({...filters, type: e.target.value})}>
                    <option value="">All Types</option>
                    <option value="Income">Income</option>
                    <option value="Expense">Expense</option>
                </select>
                <input type="number" placeholder="Min Amount" value={filters.minAmount} onChange={(e) => setFilters({...filters, minAmount: e.target.value})}/>
                <input type="number" placeholder="Max Amount" value={filters.maxAmount} onChange={(e) => setFilters({...filters, maxAmount: e.target.value})}/>
                <input type="date" value={filters.startDate} onChange={(e) => setFilters({...filters, startDate: e.target.value})} />
                <input type="date" value={filters.endDate} onChange={(e) => setFilters({...filters, endDate: e.target.value})} />
            </form>

            <h2>Previous Transactions:(treba tabela)</h2>
            <ul>
                {filterTransactions && filterTransactions.map(transaction => 
                    <li key={transaction.TRANSACTION_ID}>
                        {transaction.TRANSACTION_DATE}: {transaction.TRANSACTION_AMOUNT} for {transaction.TRANSACTION_DESCRIPTION} ({transaction.TRANSACTION_TYPE})
                        <button onClick={() => handleDelete(transaction.TRANSACTION_ID)}>Delete</button>
                    </li>
                )}
            </ul>
        </div>
    );
};

export default Transactions