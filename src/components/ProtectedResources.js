import React, { useState, useEffect, useContext } from 'react';
import { UserContext } from './UseContext'; // Import UserContext
import axios from 'axios';

const ProtectedResource = () => {
  const [data, setData] = useState(null);
  const [error, setError] = useState(null);
  const { user, loading } = useContext(UserContext); // Get user and loading from UserContext

  const fetchProtectedResource = async () => {
    try {
      const response = await axios.get('/api/protected-resource', {
        withCredentials: true,
      });
      setData(response.data);
    } catch (error) {
      setError('Error fetching protected resource');
      console.error('Error fetching protected resource:', error);
    }
  };

  useEffect(() => {
    fetchProtectedResource();
  }, []);

  return (
    <div>
      <h2>Protected Resource Data</h2>
      {error && <p>{error}</p>}
      {data ? (
        <div>
          <pre>{JSON.stringify(data, null, 2)}</pre>
        </div>
      ) : (
        <p>Loading protected resource data...</p>
      )}

      <h2>User Profile</h2>
      {loading ? <p>Loading user data...</p> : (
        <div>
          <h3>Welcome, {user ? user.username : 'Guest'}</h3>
          <pre>{JSON.stringify(user, null, 2)}</pre>
        </div>
      )}
    </div>
  );
};

export default ProtectedResource;
