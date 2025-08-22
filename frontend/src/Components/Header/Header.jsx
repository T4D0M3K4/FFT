import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { AuthContext } from "../../Auth/AuthContext/AuthContext";
import Navbar from "../Navbar/Navbar";
import './Header.css';

const Header = () => {

    const {user, logout} = useContext(AuthContext);

    return (
        <header className="header-container">
            <div className="logo">
                <h1><Link to={'../'}>BudgetBuddy</Link></h1>
                {user && <nav className="navbar">
                    {<Link to={'../'}>Home</Link>}
                    {user.USER_ROLE === 'Regular' && <Link to={'../transactions'}>Transactions</Link>}
                    {user.USER_ROLE === 'Regular' && <Link to={'../budgets'}>Budgets</Link>}
                    {user.USER_ROLE === 'Regular' && <Link to={'../bills'}>Bills</Link>}
                    {user.USER_ROLE === 'Admin' && <Link to={'../categories'}>Categories</Link>}
                    {user.USER_ROLE === 'Regular' && <Link to={'../profile'}>Profile</Link>} 
                    {user.USER_ROLE === 'Admin' && <Link to={'/bills/upload'}>Upload Bill</Link>}
                    {user.USER_ROLE === 'Admin' && <Link to={'/users'}>Users</Link>}       
                </nav>} 
            </div>
            
                {user && <Link to={'../login'} id="logout-btn" onClick={logout}>Logout</Link>}
        </header>
    );
};

export default Header