import { useState, useContext } from "react";
import { AuthContext } from "../../Auth/AuthContext/AuthContext";
import {Link, useNavigate } from "react-router-dom";
import styles from './Login.module.css';

const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const {login} = useContext(AuthContext);
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await login({USER_EMAIL: email, USER_PASSWORD: password});
            navigate('/dashboard');
        }
        catch (err) {
            alert('Login failed');
            console.log(err);
        }
    };

    return(
        <div className={styles.container}>
            <form  className={styles.loginform} onSubmit={handleSubmit}>
                <h2 className={styles.loginh2}>Login</h2>
                <input className={styles.logininput} type="email" placeholder="Enter email" value={email} onChange={(e) => setEmail(e.target.value)} required />
                <input className={styles.logininput} type="password" placeholder="Enter password" value={password} onChange={(e) => setPassword(e.target.value)} required/>
                <button className={styles.loginbutton} type="submit">Login</button>
                <p>Don't have an account? <Link to={'/register'}>Register</Link></p>
            </form>
        </div>
    );
};

export default Login;
