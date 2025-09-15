import React, {useEffect, useState} from "react";
import api from  '../../API/API';
import './users.css';

const Users = () => {
    const [users, setUsers] = useState([]);
    const [editUser, setEditUser] = useState({
        newName:'',
        newSurname:'',
        newEmail:'',
        newPassword:'',
        userId: null,
        newRole: 'Regular'
    })
   
    const loadUsers = () => {
        api.get('/users').then(res => setUsers(res.data));
    };

    useEffect(() => {
        loadUsers();
    }, []);

    const handleEdit = async (userId) => {
        const userToEdit = users.find(u => u.USER_ID === userId);
        setEditUser({
            newName: userToEdit.USER_NAME || '',
            newSurname: userToEdit.USER_SURNAME || '',
            newEmail: userToEdit.USER_EMAIL || '',
            newPassword: '',
            userId: userToEdit.USER_ID,
            newRole: userToEdit.USER_ROLE
        });
        document.getElementById(`myModal-${userId}`).style.display = "block";
    }

    const handleUpdate = async (e) => {
        e.preventDefault();
        if (!editUser.userId) return;
        await api.put(`/users/${editUser.userId}`, {
            USER_NAME: editUser.newName,
            USER_SURNAME: editUser.newSurname,
            USER_EMAIL: editUser.newEmail,
            USER_PASSWORD: editUser.newPassword,
            USER_ROLE: editUser.newRole || 'Regular'
        });
        loadUsers();
        document.getElementById(`myModal-${editUser.userId}`).style.display = "none";
    }

    const handleDelete = async (id) => {
        await api.delete(`/users/${id}`);
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
                    <th colSpan={2} style={{textAlign:"center"}}>Actions</th>
                </tr>
                {users.map(user => user.USER_ID !== JSON.parse(localStorage.getItem('user')).USER_ID &&
                    <tr key={user.USER_ID}>
                        <td>{user.USER_ID}</td>
                        <td>{user.USER_NAME}</td>
                        <td>{user.USER_SURNAME}</td>
                        <td>{user.USER_EMAIL}</td>
                        <td>{user.USER_ROLE}</td>
                        <td><button onClick={() => handleEdit(user.USER_ID)}>Edit</button>
                        <div id={`myModal-${user.USER_ID}`} className="modal"> 
                            <div className="modal-content">
                                <span className="close" onClick={()=>{document.getElementById(`myModal-${user.USER_ID}`).style.display = "none";}}>&times;</span>
                                <form onSubmit={handleUpdate}>
                                    <label htmlFor="name">Name:</label>
                                    <input id="name" placeholder="Name" value={editUser.newName} onChange={(e) => setEditUser({...editUser, newName: e.target.value})} />

                                    <label htmlFor="surname">Surname:</label>
                                    <input id="surname" placeholder="Surname" value={editUser.newSurname} onChange={(e) => setEditUser({...editUser, newSurname: e.target.value})} />

                                    <label htmlFor="email">Email:</label>
                                    <input id="email" placeholder="Email" value={editUser.newEmail} onChange={(e) => setEditUser({...editUser, newEmail: e.target.value})} />

                                    <label htmlFor="password">Password:</label>
                                    <input id="password" type="password" placeholder="Password" value={editUser.newPassword} onChange={(e) => setEditUser({...editUser, newPassword: e.target.value})} />

                                    <button type="submit">Update</button>
                                </form> 
                            </div>
                        </div>
                        </td>
                        <td><button onClick={() => handleDelete(user.USER_ID)}>Delete</button></td>
                    </tr>
                )}
            </table>
        </div>
    );
};

export default Users;