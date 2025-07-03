import { useState } from "react";
import api from "../../API/API";
import { Link } from "react-router-dom";

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
        <div className='container'>
            <form onSubmit={handleSubmit}>
                <h1>Register</h1>
                <label htmlFor="name">Name:</label>
                <input id="name" placeholder="Name" value={name} onChange={(e) => setName(e.target.value)} required/>
                
                <label htmlFor="surname">Surname:</label>
                <input id="surname" placeholder="Surname" value={surname} onChange={(e) => setSurname(e.target.value)} required/>
                
                <label htmlFor="email">Email:</label>
                <input id="email" type="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} required/>
                
                <label htmlFor="password">Password:</label>
                <input id="password" type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} required/>
                <button type="submit">Register</button>
                <p>Already have an account? <Link to={'../login'}>Login</Link></p>
            </form>
        </div>
    );
};

export default Register;