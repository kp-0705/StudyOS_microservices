 
import { createContext, useContext, useState, useEffect } from 'react';
import authService from '../services/authService';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser]   = useState(null);
  const [token, setToken] = useState(localStorage.getItem('token') || null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const verify = async () => {
      if (token) {
        try {
          const res = await authService.getMe(token);
          setUser(res.data);
        } catch {
          setToken(null);
          localStorage.removeItem('token');
        }
      }
      setLoading(false);
    };
    verify();
  }, [token]);

  const login = async (email, password) => {
    const res = await authService.login({ email, password });
    setToken(res.data.token);
    setUser(res.data);
    localStorage.setItem('token', res.data.token);
  };

  const register = async (name, email, password) => {
    const res = await authService.register({ name, email, password });
    setToken(res.data.token);
    setUser(res.data);
    localStorage.setItem('token', res.data.token);
  };

  const logout = () => {
    setToken(null);
    setUser(null);
    localStorage.removeItem('token');
  };

  return (
    <AuthContext.Provider value={{ user, token, login, register, logout, loading }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);