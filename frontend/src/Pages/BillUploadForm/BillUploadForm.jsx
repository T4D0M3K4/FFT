import React, {useState} from "react";
import api from "../../API/API";

const BillUploadForm = () => {
    const [file, setFile] = useState(null);
    const [dueDate, setDueDate] = useState('');
    const [amount, setAmount] = useState('');
    const [budgetId, setBudgetId] = useState(1);

    const handleSubmit = async (e) => {
        e.preventDefault();
        const formData = new FormData();
        formData.append('bill', file);
        formData.append('BILL_DUEDATE', dueDate);
        formData.append('BILL_AMOUNT', amount);
        formData.append('BILL_STATUS', 'Pending');
        formData.append('BUDGET_ID', budgetId);

        try {
            await api.post('/bills/upload', formData);
            alert('Bill uploaded!');
        }
        catch (err) {
            alert('Upload failed!');
        }
    };

    return(
        <form onSubmit={handleSubmit} encType="multipart/form-data">
            <h2>Upload BIll</h2>
            <input type="file" onChange={(e) => setFile(e.target.files[0])} required/>
            <input type="date" value={dueDate} onChange={(e) => setDueDate(e.target.value)} required/>
            <input type="number" placeholder="Amount" value={amount} onChange={(e) => setAmount(e.target.value)} required/>
            <input type="number" placeholder="Budget ID" value={budgetId} onChange={(e) => setBudgetId(e.target.value)} required/>
            <button type="submit">Upload</button>
        </form>
    );
};

export default BillUploadForm