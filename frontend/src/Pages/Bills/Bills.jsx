import React, {useEffect, useState} from "react";
import api from "../../API/API";
import styles from './Bills.module.css'

const Bills = () => {
    const [bills, setBills] = useState([]);
    const [statusUpdates, setStatusUpdates] = useState({});

    const loadBills = () => {
        api.get('/bills')
            .then(res => setBills(res.data))
            .catch(err => console.error(err));
    }

    useEffect(() => {
        loadBills();
    }, []);

    const handleStatusChange = async (id, newStatus) => {
        await api.put(`/bills/${id}`, {BILL_STATUS: newStatus});
        loadBills();
    };

    return(
        <div className={styles.container}>
            <h2>Your Bills</h2>
            <ul className={styles.billul}>
                {bills.map(bill => {
                    <li className={styles.billli} key={bill.BILL_ID}>
                        {bill.BILL_DUEDATE}: {bill.BILL_AMOUNT} ({bill.BILL_STATUS})
                        <select className={styles.billli} value={bill.BILL_STATUS} onChange={(e) => handleStatusChange(bill.BILL_ID, e.target.value)}>
                            <option value="Pending">Pending</option>
                            <option value="Paid">Paid</option>
                            <option value="Overdue">Overdue</option>
                        </select>
                    </li>
                })}
            </ul>
        </div>
    );
};

export default Bills