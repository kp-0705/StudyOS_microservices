 
import axios from 'axios';

const API = process.env.REACT_APP_API_URL + '/api/auth';

const register = (data) => axios.post(`${API}/register`, data);
const login    = (data) => axios.post(`${API}/login`, data);
const getMe    = (token) => axios.get(`${API}/me`, {
  headers: { Authorization: `Bearer ${token}` }
});

const authService = { register, login, getMe };
export default authService;