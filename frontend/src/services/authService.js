import axios from 'axios';

const API = 'http://localhost:5002/api/auth';

const register = (data)  => axios.post(`${API}/register`, data);
const login    = (data)  => axios.post(`${API}/login`, data);
const getMe    = (token) => axios.get(`${API}/me`, {
  headers: { Authorization: `Bearer ${token}` }
});

const authService = { register, login, getMe };
export default authService;