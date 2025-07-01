import React, {useContext} from "react";
import { Link } from "react-router-dom";
import { AuthContext } from "../../Auth/AuthContext/AuthContext";

const Navbar = () => {
    const {user, logout} = useContext(AuthContext);

    return(
        <nav>
           <ul>
                <li><Link to={'../dashboard'}>Family Finance Tracker</Link></li>
                <li><Link to={'../transactions'}>Transactions</Link></li>
                <li><Link to={'../bills'}>Bills</Link></li>
                <li><Link to={'../budgets'}>Budgets</Link></li>
                <li><Link to={'../categories'}>Categories</Link></li>
                <li><Link to={'../profile'}>Profile</Link></li>
                {user && user.USER_ROLE==='Admin' && <li><Link to={'/bills/upload'}>Upload Bill</Link></li>}
                {user && <button onClick={logout}>Logout</button>}
           </ul>
        </nav>
    );
};

export default Navbar