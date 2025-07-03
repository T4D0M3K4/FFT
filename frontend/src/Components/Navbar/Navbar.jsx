import React, {useContext} from "react";
import { Link } from "react-router-dom";
import { AuthContext } from "../../Auth/AuthContext/AuthContext";
import styles from './Navbar.module.css';

const Navbar = () => {
    const {user, logout} = useContext(AuthContext);

    return(
        <nav className={styles.navbar}>
            <div className={styles.navbarLeft}>
                {!user && <Link className={styles.title} to={'../'}>BudgetBuddy</Link>}
                {user && user.USER_ROLE === 'Regular' && <Link className={styles.title} to={'../'}>BudgetBuddy</Link>}
                {user && user.USER_ROLE === 'Admin' && <Link className={styles.title} to={'../'}>BudgetBuddy</Link>}
                {user && user.USER_ROLE === 'Regular' && <Link to={'../transactions'}>Transactions</Link>}
                {user && user.USER_ROLE === 'Regular' && <Link to={'../bills'}>Bills</Link>}
                {user && user.USER_ROLE === 'Regular' && <Link to={'../budgets'}>Budgets</Link>}
                {user && user.USER_ROLE === 'Admin' && <Link to={'../categories'}>Categories</Link>}
                {user && user.USER_ROLE === 'Regular' && <Link to={'../profile'}>Profile</Link>} 
                {user && user.USER_ROLE === 'Admin' && <Link to={'/bills/upload'}>Upload Bill</Link>}
                {user && user.USER_ROLE === 'Admin' && <Link to={'/users'}>Users</Link>}
            </div>
            <div className={styles.navbarRight}>
                {user && <button onClick={logout}>Logout</button>}
            </div>
            
        </nav>
    );
};

export default Navbar