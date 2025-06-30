import { useState, useContext } from "react";
import { AuthContext } from "../../Auth/AuthContext/AuthContext";
import api from "../../API/API";

const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const {login} = useContext(AuthContext);

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const res = await api.post('/auth/login', {
                USER_EMAIL: email,
                USER_PASSWORD: password
            });
            const {token} = res.data;
            const decoded = JSON.parse(atob(token.split('.')[1]));
            login(token, decoded.role);
            window.location.href = '/';
        }
        catch (err) {
            alert('Login failed');
        }
    };

    return(
        <form onSubmit={handleSubmit}>
            <h2>Login</h2>
            <input type="email" placeholder="Enter email" value={email} onChange={(e) => setEmail(e.target.value)} required />
            <input type="password" placeholder="Enter password" value={password} onChange={(e) => setPassword(e.target.value)} required/>
            <button type="submit">Login</button>
        </form>
    );
};

export default Login;
