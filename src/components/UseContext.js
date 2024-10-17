// UserContext.js
import React, { createContext, useState, useEffect } from 'react';
import axiosInstance from '../api/axiosInstance';

export const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axiosInstance.get('/api/users/me')
      .then((response) => {
        setUser(response.data);
      })
      .catch((error) => {
        console.error('Error fetching user data:', error);
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  return (
    <UserContext.Provider value={{ user, loading }}>
      {children}
    </UserContext.Provider>
  );
};

export default UserContext;