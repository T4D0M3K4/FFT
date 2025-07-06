import React, {useEffect, useState} from "react";
import api from "../../API/API";

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
        <div className='container'>
            <h2>Search Bills:</h2>
            <form>
                <label htmlFor="status">Bill Status:</label>
                <select id="status" value={filters.billStatus} onChange={(e) => setFilters({...filters, billStatus: e.target.value})}>
                    <option value="">All Statuses</option>
                    <option value="Pending">Pending</option>
                    <option value="Paid">Paid</option>
                    <option value="Overdue">Overdue</option>
                </select>
                
                <label htmlFor="min">Minimal Amount:</label>
                <input id="min" type="number" placeholder="Min Amount" value={filters.minAmount} onChange={(e) => setFilters({...filters, minAmount: e.target.value})} />
                
                <label htmlFor="max">Maximal Amount:</label>
                <input id="max" type="number" placeholder="Max Amount" value={filters.maxAmount} onChange={(e) => setFilters({...filters, maxAmount: e.target.value})} />
                
                <label htmlFor="from">From:</label>
                <input id="from" type="date" value={filters.startDate} onChange={(e) => setFilters({...filters, startDate: e.target.value})} />
                
                <label htmlFor="to">To:</label>
                <input id="to" type="date" value={filters.endDate} onChange={(e) => setFilters({...filters, endDate: e.target.value})} />
            </form><br /><hr />

            <h2>Current Bills:</h2>
            <table>
                <tr>
                    <th>File</th>
                    <th>Due Date</th>
                    <th>Amount</th>
                    <th>Status</th>
                    <th>Change Status</th>
                    <th></th>
                </tr>
                {filteredBills && filteredBills.map(bill =>
                    <tr>
                        <td>File</td>
                        <td>{bill.BILL_DUEDATE}</td>
                        <td>{bill.BILL_AMOUNT}</td>
                        <td>{bill.BILL_STATUS}</td>
                        <td>
                            <select value={bill.BILL_STATUS} onChange={(e) => handleStatusChange(bill.BILL_ID, e.target.value)}>
                                <option value="Pending">Pending</option>
                                <option value="Paid">Paid</option>
                                <option value="Overdue">Overdue</option>
                            </select>
                        </td>
                        <td><button onClick={() => handleDelete(bill.BILL_ID)}>Delete</button></td>
                    </tr>
                )}
            </table>
        </div>
    );
};

export default Bills