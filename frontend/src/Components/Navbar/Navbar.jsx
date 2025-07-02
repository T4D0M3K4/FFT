import React, {useContext} from "react";
import { Link } from "react-router-dom";
import { AuthContext } from "../../Auth/AuthContext/AuthContext";
import styles from './Navbar.module.css';

const Navbar = () => {
    const {user, logout} = useContext(AuthContext);

    return(
        <nav className={styles.navbar}>
            <div className={styles.navbarLeft}>
                <Link className={styles.title} to={'../dashboard'}>BudgetBuddy</Link>
                {user && <Link to={'../transactions'}>Transactions</Link>}
                {user && <Link to={'../bills'}>Bills</Link>}
                {user && <Link to={'../budgets'}>Budgets</Link>}
                {user && user.USER_ROLE === 'Admin' && <Link to={'../categories'}>Categories</Link>}
                {user && <Link to={'../profile'}>Profile</Link>} 
                {user && user.USER_ROLE==='Admin' && <li><Link to={'/bills/upload'}>Upload Bill</Link></li>}
            </div>
            <div className={styles.navbarRight}>
                {user && <button onClick={logout}>Logout</button>}
            </div>
            
        </nav>
    );
};

export default Navbar