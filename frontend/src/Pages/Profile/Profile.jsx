import React, {useState} from "react";
import api from "../../API/API";
import styles from './Profile.module.css';

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
        <div className={styles.profilecontainer}>
            <h2>Profile Settings</h2>
            {imageUrl && <img src={imageUrl} alt="Profile preview" className={styles.preview}/>}
            <form onSubmit={handleUpload} encType="multipart/form-data" className={styles.profileform}>
                <label htmlFor="profile">Choose new profile picture:</label>
                <input type="file" id="profile" onChange={(e) => setFile(e.target.files[0])} required/>
                <button className={styles.profilebutton} type="submit">Upload</button>
            </form>
        </div>
    );
};

export default Profile