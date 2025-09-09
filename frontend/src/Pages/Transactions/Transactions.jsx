import React, {useEffect, useState} from "react";
import api from "../../API/API";
import Footer from "../../Components/Footer/Footer";
import './transactions.css';

const Transactions = () => {
    const [transactions, setTransactions] = useState([]);
    const [categories, setCategories]=useState([]);
    const [newTransaction, setNewTransaction] = useState({
            TRANSACTION_TYPE: 'Expense',
            TRANSACTION_AMOUNT: '',
            TRANSACTION_DATE: '',
            TRANSACTION_DESCRIPTION: '',
            CATEGORY_ID: 1,
            BUDGET_ID: 11
        });

    const [search, setSearch] = useState('');
    const [filters, setFilters] = useState({
        type: '',
        minAmount: '',
        startDate: '',
        endDate: '',
        category: ''
    });

    const loadTransactions = async () => {
        await api.get('/transactions')
                .then(res => setTransactions(res.data))
                .catch(err => console.error(err));
    }

    const loadCategories=async ()=>{
        await api.get('/categories').
        then(res=>setCategories(res.data)).
        catch(err=>console.error(err));
    }

    useEffect(() => {
        loadTransactions();
        loadCategories();
    }, []);

    const handleCreate = async (e) => {
        e.preventDefault();
        if (!newTransaction.TRANSACTION_AMOUNT || isNaN(Number(newTransaction.TRANSACTION_AMOUNT))) {
            alert("Unesite ispravan iznos.");
            return;
        }
        if (!newTransaction.TRANSACTION_DATE) {
            alert("Unesite datum transakcije.");
            return;
        }
        if (!newTransaction.TRANSACTION_DESCRIPTION) {
            alert("Unesite opis transakcije.");
            return;
        }
        const payload = {
            ...newTransaction,
            TRANSACTION_AMOUNT: Number(newTransaction.TRANSACTION_AMOUNT),
        };
        try {
            await api.post('/transactions', payload);
            console.log(newTransaction.CATEGORY_ID);
            setNewTransaction({
                TRANSACTION_TYPE: 'Expense',
                TRANSACTION_AMOUNT: '',
                TRANSACTION_DATE: '',
                TRANSACTION_DESCRIPTION: '',
                CATEGORY_ID: 1,
                BUDGET_ID: 1
            });
            loadTransactions();
        } catch (err) {
            console.error(err);
            if (err.response && err.response.data && err.response.data.message) {
                alert("Greška: " + err.response.data.message);
            } else {
                alert("Došlo je do greške pri dodavanju transakcije!");
            }
        }
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
        const matchesCat = !filters.category || transaction.CATEGORY_NAME === filters.category;

        return matchesSearch && matchesType && matchesMin && matchesMax && matchesStart && matchesEnd && matchesCat;
    });

    const [transactionType, setTransactionType] = useState("Add");

    const handleTransactionType = (e) => {
        setTransactionType(e.target.value);
    }

    return(
        <>
        <div className="selector">
            <div className="">
                <input type="radio" name="transactionType" value="Add" onChange={handleTransactionType} checked={transactionType==="Add"?true:false}/>
                <label htmlFor="transactionType">Add Transaction</label>
            </div>

            <div className="">
                <input type="radio" name="transactionType" value="Search" onChange={handleTransactionType} />
                <label htmlFor="transactionType">Search Transactions</label>
            </div>
        </div>
        <>
            {transactionType==="Add"&&(<div className='add-container'>
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
                <select id="categ" onChange={(e)=>setNewTransaction({...newTransaction, CATEGORY_ID:parseInt(e.target.value)})}>
                    {categories.filter((cat)=>cat.CATEGORY_TYPE==='Transaction').map(category=>   
                        <option value={category.CATEGORY_ID}>{category.CATEGORY_NAME}</option>                  
                    )}    
                </select>
                
                <label htmlFor="desc">Description:</label>
                <input id="desc" placeholder="Description" value={newTransaction.TRANSACTION_DESCRIPTION} onChange={(e) => setNewTransaction({ ...newTransaction, TRANSACTION_DESCRIPTION: e.target.value })} />

                <label htmlFor="tdate">Transaction Date:</label>
                <input id="tdate" type="date" value={newTransaction.TRANSACTION_DATE} onChange={(e) => setNewTransaction({ ...newTransaction, TRANSACTION_DATE: e.target.value })} required />
                <button type="submit">Add Transaction</button>
            </form>
           
                
            
           
            </div>
        )}
            </>
            {transactionType==="Search"&&
            (<>
            <div className='search-container'>
                <h2>Search:</h2>
                <form>
                    <label htmlFor="desc">Description:</label>
                    <input id="desc" type="text" placeholder="Search by description" value={search} onChange={(e) => setSearch(e.target.value)}/>
                    
                    <label htmlFor="type">Type:</label>
                    <select id="type" value={filters.type} onChange={(e) => setFilters({...filters, type: e.target.value})}>
                        <option value="">All Types</option>
                        <option value="Income">Income</option>
                        <option value="Expense">Expense</option>
                    </select>

                    <label htmlFor="min">Minimal Amount:</label>
                    <input id="min" type="number" placeholder="Min Amount" value={filters.minAmount} onChange={(e) => setFilters({...filters, minAmount: e.target.value})}/>
                    
                    <label htmlFor="max">Maximal Amount:</label>
                    <input id="max" type="number" placeholder="Max Amount" value={filters.maxAmount} onChange={(e) => setFilters({...filters, maxAmount: e.target.value})}/>

                    <label htmlFor="from">From:</label>
                    <input id="from" type="date" value={filters.startDate} onChange={(e) => setFilters({...filters, startDate: e.target.value})} />

                    <label htmlFor="categ">Category:</label>
                    <select id="categ" value={filters.category} onChange={(e)=>setFilters({...filters, category:e.target.value})}>
                        <option value="">All Types</option>
                    {categories.filter((cat)=>cat.CATEGORY_TYPE==='Transaction').map(category=>   
                        <option value={category.CATEGORY_NAME}>{category.CATEGORY_NAME}</option>                  
                    )}    
                    </select>
                    
                    
                    <label htmlFor="to">To:</label>
                    <input id="to" type="date" value={filters.endDate} onChange={(e) => setFilters({...filters, endDate: e.target.value})} />
            </form>
            <br/><hr/>
               

            <h2>Previous Transactions:</h2>
            <table>
                <tr>
                    <th>Date</th>
                    <th>Amount</th>
                    <th>Descripton</th>
                    <th>Category</th>
                    <th>Type</th>
                    <th></th>
                </tr>
                {filterTransactions && filterTransactions.map((transaction, index)  => 
                    <tr key={index}>
                        <td>{transaction.TRANSACTION_DATE}</td>
                        <td>{transaction.TRANSACTION_AMOUNT}</td>
                        <td>{transaction.TRANSACTION_DESCRIPTION}</td>
                        <td>{transaction.CATEGORY_NAME}</td>
                        <td>{transaction.TRANSACTION_TYPE}</td>
                        <td><button onClick={() => handleDelete(transaction.TRANSACTION_ID)}>Delete</button></td>
                    </tr>
                )}
            </table>         
             </div>
            </>
            )}
            <Footer />
        </>
    );
};

export default Transactions