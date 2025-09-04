import React, {useEffect, useState} from "react";
import api from "../../API/API";
import Footer from "../../Components/Footer/Footer";
import './budgets.css';

const Budgets = () => {
    const [budgets, setBudgets] = useState([]);
    const [newBudget, setNewBudget] = useState({
        BUDGET_AMOUNT: '',
        BUDGET_STARTDATE: '',
        BUDGET_ENDDATE: '',
        CATEGORY_ID: 1
    });

    const [filters, setFilters] = useState({
        minAmount: '',
        maxAmount: '',
        startDate: '',
        endDate: ''
    });

    const loadBudgets = () => {
        api.get('/budgets')
            .then(res => setBudgets(res.data))
            .catch(err => console.error(err));
    };

    useEffect(() => {
        loadBudgets();
    }, []);

    const handleCreate = async (e) => {
        e.preventDefault();
        await api.post('/budgets', newBudget);
        setNewBudget({
            BUDGET_AMOUNT: '',
            BUDGET_STARTDATE: '',
            BUDGET_ENDDATE: '',
            CATEGORY_ID: 1
        });
        loadBudgets();
    };

    const handleDelete = async (id) => {
        await api.delete(`/budgets/${id}`);
        loadBudgets();
    };

    const filteredBudgets = budgets.filter(budget => {
        const matchMin = !filters.minAmount || budget.BUDGET_AMOUNT >= parseFloat(filters.minAmount);
        const matchMax = !filters.maxAmount || budget.BUDGET_AMOUNT <= parseFloat(filters.maxAmount);
        const matchStart = !filters.startDate || budget.BUDGET_STARTDATE >= filters.startDate;
        const matchEnd = !filters.endDate || budget.BUDGET_ENDDATE <= filters.endDate;

        return matchMin && matchMax && matchStart && matchEnd;
    });

    const [budgetType, setBudgetType]=useState("Create");

    const handleBudgetType = (e) => {
        setBudgetType(e.target.value);
    }

    return(
        <>

        <div className="selector">
            <div className="">
                <input type="radio" name="budgetType" value="Create" onChange={handleBudgetType} checked={budgetType==="Create"?true:false}/>
                <label htmlFor="budgetType">Add Budget</label>
            </div>

            <div className="">
                <input type="radio" name="budgetType" value="Search" onChange={handleBudgetType} />
                <label htmlFor="budgetType">Search Budgets</label>
            </div>
        </div>
        
        <>
        {budgetType==="Create"&&(
        <div className="create-container">
            <h2>Create a New Budget</h2>
            <form onSubmit={handleCreate}>
                <label htmlFor="name">Budget Name:</label>

                <label htmlFor="amount">Amount:</label>
                <input id="amount" type="number" placeholder="Amount" value={newBudget.BUDGET_AMOUNT} onChange={(e) => setNewBudget({...newBudget, BUDGET_AMOUNT: e.target.value})} required/>
                
                <label htmlFor="start">Start Date:</label>
                <input id="start" type="date" value={newBudget.BUDGET_STARTDATE} onChange={(e) => setNewBudget({...newBudget, BUDGET_STARTDATE: e.target.value})} required />
                
                <label htmlFor="end">End Date:</label>
                <input id="end" type="date" value={newBudget.BUDGET_ENDDATE} onChange={(e) => setNewBudget({...newBudget, BUDGET_ENDDATE: e.target.value})} required />
                
                <label htmlFor="category">Category:</label>

                <button type="submit">Add Budget</button>
            </form>

            <div className="footer-fixed-wrapper">
                <Footer />
            </div>

            </div>)}
            </>
{budgetType==="Search"&&(<>
        <div className="search-container">
            <h2>Search:</h2>
            <form>
                <label htmlFor="min">Minimal Amount:</label>
                <input id="min" type="number" placeholder="Min Amount" value={filters.minAmount} onChange={(e) => setFilters({...filters, minAmount: e.target.value})} />
                
                <label htmlFor="max">Maximal Amount:</label>
                <input id="max" type="number" placeholder="Max Amount" value={filters.maxAmount} onChange={(e) => setFilters({...filters, maxAmount: e.target.value})} />
                
                <label htmlFor="from">From:</label>
                <input id="from" type="date" value={filters.startDate} onChange={(e) => setFilters({...filters, startDate: e.target.value})} />
                
                <label htmlFor="to">To:</label>
                <input id="to" type="date" value={filters.endDate} onChange={(e) => setFilters({...filters, endDate: e.target.value})} />
            </form><br /><hr />
            
            <h2>Active Budgets:</h2>
            <table>
                <tr>
                    <th>Name</th>
                    <th>Start Date</th>
                    <th>End Date</th>
                    <th>Amount</th>
                    <th></th>
                </tr>
                {filteredBudgets && filteredBudgets.map(budget => 
                    <tr>
                        <td>Name</td>
                        <td>{budget.BUDGET_STARTDATE}</td>
                        <td>{budget.BUDGET_ENDDATE}</td>
                        <td>{budget.BUDGET_AMOUNT}</td>
                        <td><button onClick={() => handleDelete(budget.BUDGET_ID)}>Delete</button></td>
                    </tr>
                )}
            </table>
            </div>
        <Footer/>
        </>)}
        </>
    );
};

export default Budgets