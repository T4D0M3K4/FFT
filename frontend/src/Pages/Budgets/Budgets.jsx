import React, {useEffect, useState} from "react";
import api from "../../API/API";

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
        <div>
            <h2>Your Budgets</h2>
            <form onSubmit={handleCreate}>
                <input type="number" placeholder="Amount" value={newBudget.BUDGET_AMOUNT} onChange={(e) => setNewBudget({...newBudget, BUDGET_AMOUNT: e.target.value})} required/>
                <input type="date" value={newBudget.BUDGET_STARTDATE} onChange={(e) => setNewBudget({...newBudget, BUDGET_STARTDATE: e.target.value})} required />
                <input type="date" value={newBudget.BUDGET_ENDDATE} onChange={(e) => setNewBudget({...newBudget, BUDGET_ENDDATE: e.target.value})} required />
                <button type="submit">Add Budget</button>
            </form>
            <ul>
                {budgets.map(budget =>
                    <li key={budget.BUDGET_ID}>
                        {budget.BUDGET_STARTDATE} to {budget.BUDGET_ENDDATE}: {budget.BUDGET_AMOUNT}
                        <button onClick={() => handleDelete(budget.BUDGET_ID)}>Delete</button>
                    </li>
                )}
            </ul>
        </div>
    );
};

export default Budgets