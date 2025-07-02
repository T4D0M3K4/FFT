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

    return(
        <div className={styles.container}>
            <h2>Your Budgets</h2>
            <form className={styles.budgetsform} onSubmit={handleCreate}>
                <input className={styles.budgetsinput} type="number" placeholder="Amount" value={newBudget.BUDGET_AMOUNT} onChange={(e) => setNewBudget({...newBudget, BUDGET_AMOUNT: e.target.value})} required/>
                <input className={styles.budgetsinput} type="date" value={newBudget.BUDGET_STARTDATE} onChange={(e) => setNewBudget({...newBudget, BUDGET_STARTDATE: e.target.value})} required />
                <input className={styles.budgetsinput} type="date" value={newBudget.BUDGET_ENDDATE} onChange={(e) => setNewBudget({...newBudget, BUDGET_ENDDATE: e.target.value})} required />
                <button className={styles.budgetsbutton} type="submit">Add Budget</button>
            </form>
            <ul className={styles.budgetsul}>
                {budgets.map(budget =>
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