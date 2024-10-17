import React, { useContext } from 'react';  
import { AuthContext } from '../pages/Login/AuthorizationContext';  
  
const CurrentUser = () => {
  const { user } = useContext(AuthContext);
  console.log("User info: ", user)

  if (!user) {
    return <div>loading...</div>
  }

  return (
    <div>
      <h2>User: </h2>
      <p>{user.userName} + " " + {user.userSurname}</p>
    </div>
  );
}; 
  
export default CurrentUser;