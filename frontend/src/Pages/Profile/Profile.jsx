import React, {useState} from "react";
import api from "../../API/API";
import Footer from "../../Components/Footer/Footer";

const Profile = () => {
    const user=JSON.parse(localStorage.getItem("user"));

    const [editUser, setEditUser] = useState({
        newName:user.USER_NAME,
        newSurname:user.USER_SURNAME,
        newEmail:user.USER_EMAIL,
        newPassword:'',
    });

    const [btnPass, setPass] = useState(false);    

    const handleUpdate = async (e) => {
        e.preventDefault();
        if(editUser.newPassword === ''){
            alert("Please enter a new password!");
            return;
        }
        await api.put(`/users/${user.USER_ID}`, {
            USER_NAME: editUser.newName,
            USER_SURNAME: editUser.newSurname,
            USER_EMAIL: editUser.newEmail,
            USER_PASSWORD: editUser.newPassword,
            USER_ROLE: user.USER_ROLE
        });
        alert("User information updated. Please log in again.");
        localStorage.removeItem("user");
        localStorage.removeItem("token");
        window.location.href = '/login';
    }

    return(
        <>
        <div className="container">
            <h2>Profile Settings</h2>
            <h1>{user.USER_NAME} {user.USER_SURNAME}</h1>
            <h2>{user.USER_EMAIL}</h2>
        <div className="changeUser">
            <h2>Change User Information</h2>
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
        <Footer/>
        </>
    );
};

export default Profile