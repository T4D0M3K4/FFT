import React, {useEffect, useState} from "react";
import api from "../../API/API";
import styles from './Bills.module.css'

const Bills = () => {
    const [bills, setBills] = useState([]);
    const [filters, setFilters] = useState({
        billStatus: '',
        minAmount: '',
        maxAmount: '',
        startDate: '',
        endDate: ''
    });

    const loadBills = async () => {
        await api.get('/bills')
                .then(res => setBills(res.data))
                .catch(err => console.error(err));
    };

    useEffect(() => {
        loadBills();
    }, []);

    const handleDelete = async (id) => {
        await api.delete(`/bills/${id}`);
        loadBills();
    }

    const handleStatusChange = async (id, newStatus) => {
        await api.put(`/bills/${id}`, {BILL_STATUS: newStatus});
        loadBills();
    };

    const filteredBills = bills.filter(bill => {
        const matchStatus = !filters.billStatus || bill.BILL_STATUS === filters.billStatus;
        const matchMin = !filters.minAmount || bill.BILL_AMOUNT >= parseFloat(filters.minAmount);
        const matchMax = !filters.maxAmount || bill.BILL_AMOUNT <= parseFloat(filters.maxAmount);
        const matchStart = !filters.startDate || bill.BILL_DUEDATE >= filters.startDate;
        const matchEnd = !filters.endDate || bill.BILL_DUEDATE <= filters.endDate;

        return matchStatus && matchMin && matchMax && matchStart && matchEnd;
    });

    return(
        <div className={styles.container}>
            <h2>Your Bills</h2>
            <div className={styles.billsfilters}>
                <select className={styles.billselect} value={filters.billStatus} onChange={(e) => setFilters({...filters, billStatus: e.target.value})}>
                    <option value="">All Statuses</option>
                    <option value="Pending">Pending</option>
                    <option value="Paid">Paid</option>
                    <option value="Overdue">Overdue</option>
                </select>
                <input className={styles.billinput} type="number" placeholder="Min Amount" value={filters.minAmount} onChange={(e) => setFilters({...filters, minAmount: e.target.value})} />
                <input className={styles.billinput} type="number" placeholder="Max Amount" value={filters.maxAmount} onChange={(e) => setFilters({...filters, maxAmount: e.target.value})} />
                <input className={styles.billinput} type="date" value={filters.startDate} onChange={(e) => setFilters({...filters, startDate: e.target.value})} />
                <input className={styles.billinput} type="date" value={filters.endDate} onChange={(e) => setFilters({...filters, endDate: e.target.value})} />
            </div>
            <ul className={styles.billul}>
                {filteredBills && filteredBills.map(bill =>
                    <li className={styles.billsli} key={bill.BILL_ID}>
                        {bill.BILL_DUEDATE}: {bill.BILL_AMOUNT} ({bill.BILL_STATUS})
                        <select className={styles.billselect} value={bill.BILL_STATUS} onChange={(e) => handleStatusChange(bill.BILL_ID, e.target.value)}>
                            <option value="Pending">Pending</option>
                            <option value="Paid">Paid</option>
                            <option value="Overdue">Overdue</option>
                        </select>
                        <button className={styles.billbutton} onClick={() => handleDelete(bill.BILL_ID)}>Delete</button>
                    </li>
                )}
            </ul>
        </div>
    );
};

export default Bills