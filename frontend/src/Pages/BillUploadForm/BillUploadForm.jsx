import React, {useEffect, useState} from "react";
import api from "../../API/API";
import Footer from "../../Components/Footer/Footer";

const BillUploadForm = () => {
    const [file, setFile] = useState(null);
    const [dueDate, setDueDate] = useState('');
    const [amount, setAmount] = useState('');
    const [userId, setUserId] = useState();

    const handleSubmit = async (e) => {
        e.preventDefault();
        const formData = new FormData();
        formData.append('bill', file);
        formData.append('BILL_DUEDATE', dueDate);
        formData.append('BILL_AMOUNT', amount);
        formData.append('BILL_STATUS', 'Pending');
        formData.append('USER_ID', userId);


        try {
            await api.post('/bills', formData);
            alert('Bill uploaded!');
        }
        catch {
            alert('Upload failed!');
        }
    };

    const [users, setUsers] = useState([]);

    const loadUsers = () => {
        api.get('/users').then(res => setUsers(res.data));
    };

    useEffect(() => {
        loadUsers();
    },[]);

    return(
        <>
        <div className='container'>
            <form onSubmit={handleSubmit} encType="multipart/form-data">
                <h2>Upload BIll</h2>
                <label htmlFor="file">Bill:</label>
                <input id="file" type="file" onChange={(e) => setFile(e.target.files[0])} required/>
                
                <label htmlFor="due">Due Date:</label>
                <input id="due" type="date" value={dueDate} onChange={(e) => setDueDate(e.target.value)} required/>
                
                <label htmlFor="amount">Amount:</label>
                <input id="amount" type="number" placeholder="Amount" value={amount} onChange={(e) => setAmount(e.target.value)} required/>
                
                <label htmlFor="user">User:</label>
                <select id="user" onChange={(e) => setUserId(e.target.value)} required>
                    <option>--</option>
                    {users.map(user => (
                        <option key={user.USER_ID} value={user.USER_ID}>
                            {user.USER_EMAIL}
                        </option>
                    ))}
                </select>

                <button type="submit">Upload</button>
            </form>
        </div>
        <Footer/>
        </>
    );
};

export default BillUploadForm