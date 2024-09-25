import React, { useState, useEffect } from 'react';
import axios from 'axios';
import styles from './UserProfile.module.css';

const UserProfile = () => {
    const [user, setUser] = useState(null); 
    const [loading, setLoading] = useState(true); 
  
   
    const fetchUser = async () => {
      setLoading(true);
      try {
        const response = await axios.get('https://randomuser.me/api/');
        setUser(response.data.results[0]);
      } catch (error) {
        console.error('Ошибка при загрузке данных:', error);
      }
      setLoading(false); 
    };
  
   
    useEffect(() => {
      fetchUser();
    }, []);
  
   
    return (
      <div className={styles.profileContainer}>
        {loading ? (
          <p>Loading...</p>
        ) : (
          <div className={styles.userInfo}>
            <img
              src={user.picture.large}
              alt="User Profile"
              className={styles.userImage}
            />
            <h2>{`${user.name.first} ${user.name.last}`}</h2>
            <p>Email: {user.email}</p>
            <p>Phone: {`${user.phone}`}</p>
            <button className={styles.reloadButton} onClick={fetchUser}>
              Load New User
            </button>
          </div>
        )}
      </div>
    );
  };
  
  export default UserProfile;