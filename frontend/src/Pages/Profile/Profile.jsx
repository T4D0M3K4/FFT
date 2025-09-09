import React, {useState} from "react";
import api from "../../API/API";
import Footer from "../../Components/Footer/Footer";

const Profile = () => {
    const [file, setFile] = useState(null);
    // const userId = useState(1);
    const [imageUrl, setImageUrl] = useState(null);

    const user=JSON.parse(localStorage.getItem("user"));
    const userId=user.USER_ID;

    const handleUpload = async (e) => {
        e.preventDefault();
        const formData = new FormData();
        formData.append('profile', file);

        try {
            await api.put(`/users/${userId}`, formData);
            setImageUrl(URL.createObjectURL(file));
            alert('Profile image uploaded!');
            
        }
        catch (err) {
            console.log(err);
            alert('Upload failed');
        }
    };

    return(
        <>
        <div className="container">
            <h2>Profile Settings</h2>
            <h1>{user.USER_NAME} {user.USER_SURNAME}</h1>
            <h2>{user.USER_EMAIL}</h2>
        </div>
        <Footer/>
        </>
    );
};

export default Profile