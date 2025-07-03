import React, {useEffect, useState} from "react";
import api from  '../../API/API';
import styles from './Users.module.css';

const Users = () => {
    const [users, setUsers] = useState([]);
    const [editing, setEditing] = useState(null);
    const [updatedRole, setUpdatedRole] = useState('Regular');

    const loadUsers = () => {
        api.get('/users').then(res => setUsers(res.data));
    };

    useEffect(() => {
        loadUsers();
    }, []);

    const handleDelete = async (id) => {
        await api.delete(`/users/${id}`);
        loadUsers();
    };

    const handleRoleChange = async (id) => {
        await api.put(`/users/${id}`, {USER_ROLE: updatedRole});
        setEditing(null);
        loadUsers();
    };

    return (
        <div className={styles.userscontainer}>
            <h2>Manage Users</h2>
            <ul className={styles.userslist}>
                {users.map(user => user.USER_ID !== JSON.parse(localStorage.getItem('user')).USER_ID && (
                    <li className={styles.userItem} key={user.USER_ID}>
                        <div>
                            <strong>{user.USER_ID} - {user.USER_NAME} {user.USER_SURNAME}</strong> - {user.USER_EMAIL} - {user.USER_ROLE}
                        </div>
                        {editing === user.USER_ID ? (
                            <div>
                                <select value={updatedRole} onChange={(e) => setUpdatedRole(e.target.value)}>
                                    <option value="Regular">Regular</option>
                                    <option value="Admin">Admin</option>
                                </select>
                                <button className={styles.userbutton} onClick={() => handleRoleChange(user.USER_ID)}>Save</button>
                            </div>
                        ) : (
                            <div>
                                <button className={styles.userbutton} onClick={() => {
                                    setEditing(user.USER_ID);
                                    setUpdatedRole(user.USER_ROLE);
                                }}>Edit Role</button>
                                <button className={styles.userbutton} onClick={() => handleDelete(user.USER_ID)}>Delete</button>
                            </div>
                        )}
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default Users;