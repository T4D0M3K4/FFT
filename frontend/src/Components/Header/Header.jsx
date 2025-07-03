import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { AuthContext } from "../../Auth/AuthContext/AuthContext";


const Header = () => {

    const {user, logout} = useContext(AuthContext);

    return (
        <header>
            <div className="logo">
                <h1><Link to={'../'}>BudgetBuddy</Link></h1>
                {user && <Link to={'../login'} id="logout-btn" onClick={logout}>Logout</Link>}
            </div>
        </header>
    );
};

export default Header