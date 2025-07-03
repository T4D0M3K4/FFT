import React, {useEffect, useState} from "react";
import api from "../../API/API";
import styles from './Budgets.module.css';

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

    return(
        <div className={styles.container}>
            <h2>Your Budgets</h2>
            <form className={styles.budgetsform} onSubmit={handleCreate}>
                <input className={styles.budgetsinput} type="number" placeholder="Amount" value={newBudget.BUDGET_AMOUNT} onChange={(e) => setNewBudget({...newBudget, BUDGET_AMOUNT: e.target.value})} required/>
                <input className={styles.budgetsinput} type="date" value={newBudget.BUDGET_STARTDATE} onChange={(e) => setNewBudget({...newBudget, BUDGET_STARTDATE: e.target.value})} required />
                <input className={styles.budgetsinput} type="date" value={newBudget.BUDGET_ENDDATE} onChange={(e) => setNewBudget({...newBudget, BUDGET_ENDDATE: e.target.value})} required />
                <button className={styles.budgetsbutton} type="submit">Add Budget</button>
            </form>
            <div className={styles.budgetsform}>
                <input className={styles.budgetsinput} type="number" placeholder="Min Amount" value={filters.minAmount} onChange={(e) => setFilters({...filters, minAmount: e.target.value})} />
                <input className={styles.budgetsinput} type="number" placeholder="Max Amount" value={filters.maxAmount} onChange={(e) => setFilters({...filters, maxAmount: e.target.value})} />
                <input className={styles.budgetsinput} type="date" value={filters.startDate} onChange={(e) => setFilters({...filters, startDate: e.target.value})} />
                <input className={styles.budgetsinput} type="date" value={filters.endDate} onChange={(e) => setFilters({...filters, endDate: e.target.value})} />
            </div>
            <ul className={styles.budgetsul}>
                {filteredBudgets && filteredBudgets.map(budget =>
                    <li className={styles.budgetsli} key={budget.BUDGET_ID}>
                        {budget.BUDGET_STARTDATE} to {budget.BUDGET_ENDDATE}: {budget.BUDGET_AMOUNT}
                        <button className={styles.budgetsbutton} onClick={() => handleDelete(budget.BUDGET_ID)}>Delete</button>
                    </li>
                )}
            </ul>
        </div>
    );
};

export default Budgets