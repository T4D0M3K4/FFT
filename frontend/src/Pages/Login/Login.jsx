import { useState, useContext } from "react";
import { AuthContext } from "../../Auth/AuthContext/AuthContext";
import {Link, useNavigate } from "react-router-dom";
import "./login.css";

const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const {login} = useContext(AuthContext);
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await login({USER_EMAIL: email, USER_PASSWORD: password});
            navigate('/');
            

        }
        catch (err) {
            console.log(err);
            alert('Login failed');
        }
    };

    return(
        <div className="login-container">
            <form onSubmit={handleSubmit} className="login-form">
                <h1>Login</h1>
                <label htmlFor="email">Email:</label>
                <input id="email" type="email" placeholder="Enter email" value={email} onChange={(e) => setEmail(e.target.value)} required />
                
                <label htmlFor="password">Password:</label>
                <input id="password" type="password" placeholder="Enter password" value={password} onChange={(e) => setPassword(e.target.value)} required/>
                {localStorage.getItem('token') && <p style={{textAlign: 'center'}}>Invalid credentials</p>}
                <button  type="submit">Login</button>
                <p>Don't have an account? <Link to={'../register'}>Register</Link></p>
            </form>
        </div>
    );
};

export default Login;
