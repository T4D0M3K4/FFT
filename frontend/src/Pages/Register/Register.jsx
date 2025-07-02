import { useState } from "react";
import api from "../../API/API";
import { Link } from "react-router-dom";
import styles from './Register.module.css';

const Register = () => {
    const [name, setName] = useState('');
    const [surname, setSurname] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await api.post('/auth/register', {
                USER_NAME: name,
                USER_SURNAME: surname,
                USER_EMAIL: email,
                USER_PASSWORD: password
            });
            alert('Registered! You can now login.');
            window.location.href = '/login';
        }
        catch (err) {
            alert('Registering failed');
        }
    };

    return(
        <div className={styles.container}>
            <form className={styles.registerform} onSubmit={handleSubmit}>
                <h2 className={styles.registerh2}>Register</h2>
                <input className={styles.registerinput} placeholder="Name" value={name} onChange={(e) => setName(e.target.value)} required/>
                <input className={styles.registerinput} placeholder="Surname" value={surname} onChange={(e) => setSurname(e.target.value)} required/>
                <input className={styles.registerinput} type="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} required/>
                <input className={styles.registerinput} type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} required/>
                <button className={styles.registerbutton} type="submit">Register</button>
                <p>Already have an account? <Link to={'../login'}>Login</Link></p>
            </form>
        </div>
    );
};

export default Register;