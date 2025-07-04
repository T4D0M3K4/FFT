import React, {useContext} from "react";
import { Link } from "react-router-dom";
import { AuthContext } from "../../Auth/AuthContext/AuthContext";

const Navbar = () => {
    const {user, logout} = useContext(AuthContext);

    return(
        <>
        {user && <nav>
                <ul>
                    {<li><Link to={'../'}>Home</Link></li>}
                    {user.USER_ROLE === 'Regular' && <li><Link to={'../transactions'}>Transactions</Link></li>}
                    {user.USER_ROLE === 'Regular' && <li><Link to={'../budgets'}>Budgets</Link></li>}
                    {user.USER_ROLE === 'Regular' && <li><Link to={'../bills'}>Bills</Link></li>}
                    {user.USER_ROLE === 'Admin' && <li><Link to={'../categories'}>Categories</Link></li>}
                    {user.USER_ROLE === 'Regular' && <li><Link to={'../profile'}>Profile</Link></li>} 
                    {user.USER_ROLE === 'Admin' && <li><Link to={'/bills/upload'}>Upload Bill</Link></li>}
                    {user.USER_ROLE === 'Admin' && <li><Link to={'/users'}>Users</Link></li>}
                </ul>
            </nav>
        } 
        </>    
    );
};

export default Navbar