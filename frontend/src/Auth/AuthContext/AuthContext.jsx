import { createContext, useState, useEffect } from "react";
import api from '../../API/API';
export const AuthContext = createContext();


export const AuthContextProvider = ({ children }) => {
  const noUser = localStorage.getItem('user') === 'undefined';
  if (noUser) {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
  }
  const [user, setUser] = useState(JSON.parse(localStorage.getItem('user')));

  useEffect(() => {
    localStorage.setItem('user', JSON.stringify(user));
  }, [user]);

  const login = async (input) => {
    await api.post('/auth/login', input)
      .then(res => {
        localStorage.setItem('token', res.data.token);
        setUser(res.data.other);
      })
  };

  const logout = async () => {
    localStorage.clear();
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, setUser, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};