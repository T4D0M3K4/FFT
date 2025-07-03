import React, {useState} from "react";
import api from "../../API/API";
import styles from './BillUploadForm.module.css';

const BillUploadForm = () => {
    const [file, setFile] = useState(null);
    const [dueDate, setDueDate] = useState('');
    const [amount, setAmount] = useState('');
    const [budgetId, setBudgetId] = useState();
    const [userId, setUserId] = useState();

    const handleSubmit = async (e) => {
        e.preventDefault();
        const formData = new FormData();
        formData.append('bill', file);
        formData.append('BILL_DUEDATE', dueDate);
        formData.append('BILL_AMOUNT', amount);
        formData.append('BILL_STATUS', 'Pending');
        formData.append('BUDGET_ID', budgetId);
        formData.append('USER_ID', userId);

        try {
            await api.post('/bills/upload', formData);
            alert('Bill uploaded!');
            setFile(null);
            setDueDate('');
            setAmount('');
            setBudgetId(1);
            setUserId(1);
        }
        catch (err) {
            alert('Upload failed!');
        }
    };

    return(
        <div className={styles.billuploadcontainer}>
            <form className={styles.billuploadform} onSubmit={handleSubmit} encType="multipart/form-data">
                <h2>Upload BIll</h2>
                <input className={styles.billuploadinput} type="file" onChange={(e) => setFile(e.target.files[0])} required/>
                <input className={styles.billuploadinput} type="date" value={dueDate} onChange={(e) => setDueDate(e.target.value)} required/>
                <input className={styles.billuploadinput} type="number" placeholder="Amount" value={amount} onChange={(e) => setAmount(e.target.value)} required/>
                <input className={styles.billuploadinput} type="number" placeholder="Budget ID" value={budgetId} onChange={(e) => setBudgetId(e.target.value)} required/>
                <input className={styles.billuploadinput} type="number" placeholder="User ID" value={userId} onChange={(e) => setUserId(e.target.value)} required/>
                <button className={styles.billuploadbutton} type="submit">Upload</button>
            </form>
        </div>
    );
};

export default BillUploadForm