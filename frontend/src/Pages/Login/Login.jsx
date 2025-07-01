import { useState, useContext } from "react";
import { AuthContext } from "../../Auth/AuthContext/AuthContext";
import {Link, useNavigate } from "react-router-dom";

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
        <form onSubmit={handleSubmit}>
            <h2>Login</h2>
            <input type="email" placeholder="Enter email" value={email} onChange={(e) => setEmail(e.target.value)} required />
            <input type="password" placeholder="Enter password" value={password} onChange={(e) => setPassword(e.target.value)} required/>
            <button type="submit">Login</button>
            <p>Don't have an account? <Link to={'../register'}>Register</Link></p>
        </form>
    );
};

export default Login;
