import { createContext, useState } from 'react';  
  
const AuthContext = createContext();  
  
const AuthProvider = ({ children }) => {  
  const [userName, setUser] = useState(null);  
  
  const login = (userData) => {  
  setUser(userData);  
  };  
  
  const logout = () => {  
  setUser(null);  
  };  
  
  return (  
  <AuthContext.Provider value={{ userName , login, logout }}>  
  {children}  
  </AuthContext.Provider>  
  );  
};  
  
export { AuthProvider, AuthContext };
