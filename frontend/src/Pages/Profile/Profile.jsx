import React, {useState} from "react";
import api from "../../API/API";
import Footer from "../../Components/Footer/Footer";

const Profile = () => {
    const [file, setFile] = useState(null);
    const [userId, setUserId] = useState(1);
    const [imageUrl, setImageUrl] = useState(null);

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
            {imageUrl && <img src={imageUrl} alt="Profile preview" />}
            <form onSubmit={handleUpload} encType="multipart/form-data">
                <label htmlFor="profile">Choose new profile picture:</label>
                <input type="file" id="profile" onChange={(e) => setFile(e.target.files[0])} required/>
                <button type="submit">Upload</button>
            </form>
        </div>
        <Footer/>
        </>
    );
};

export default Profile