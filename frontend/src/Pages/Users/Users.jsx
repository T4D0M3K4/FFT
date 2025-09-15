import React, {useEffect, useState} from "react";
import api from  '../../API/API';

const Users = () => {
    const [users, setUsers] = useState([]);
    const [editUser, setEditUser] = useState({
        newName:'',
        newSurname:'',
        newEmail:'',
        newPassword:''
    })
    const [updatedRole, setUpdatedRole] = useState('Regular');

    const loadUsers = () => {
        api.get('/users').then(res => setUsers(res.data));
    };

    useEffect(() => {
        loadUsers();
    }, []);

    const handleEdit = async (id) => {
        editUser.newName = '';
        editUser.newSurname = '';
        editUser.newEmail = '';
        editUser.newPassword = '';
        await api.put(`/users/${id}`);
        loadUsers();
    }

    const handleDelete = async (id) => {
        await api.delete(`/users/${id}`);
        loadUsers();
    };

    const handleRoleChange = async (id) => {
        await api.put(`/users/${id}`, {USER_ROLE: updatedRole});
        loadUsers();
    };

    return (
        <div className='container'>
            <h2>Manage Users:</h2>
            <table>
                <tr>
                    <th>ID</th>
                    <th>Name</th>
                    <th>Surname</th>
                    <th>Email</th>
                    <th>Role</th>
                    <th>Change Role</th>
                    <th></th>
                    <th></th>
                </tr>
                {users.map(user => user.USER_ID !== JSON.parse(localStorage.getItem('user')).USER_ID &&
                    <tr>
                        <td>{user.USER_ID}</td>
                        <td>{user.USER_NAME}</td>
                        <td>{user.USER_SURNAME}</td>
                        <td>{user.USER_EMAIL}</td>
                        <td>{user.USER_ROLE}</td>
                        <td>
                            <select value={updatedRole} onChange={(e) => {setUpdatedRole(e.target.value); handleRoleChange(user.USER_ID)}}>
                                <option value="Regular">Regular</option>
                                <option value="Admin">Admin</option>
                            </select>
                        </td>
                        <td><button onClick={() => handleEdit(user.USER_ID)}>Edit</button></td>
                        <td><button onClick={() => handleDelete(user.USER_ID)}>Delete</button></td>
                    </tr>
                )}
            </table>
        </div>
    );
};

export default Users;