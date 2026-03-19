 
import axios from 'axios';

const API = process.env.REACT_APP_API_URL + '/api/tasks';

const getHeaders = (token) => ({
  headers: { Authorization: `Bearer ${token}` }
});

const getTasks    = (token)         => axios.get(API, getHeaders(token));
const createTask  = (token, data)   => axios.post(API, data, getHeaders(token));
const updateTask  = (token, id, data) => axios.put(`${API}/${id}`, data, getHeaders(token));
const deleteTask  = (token, id)     => axios.delete(`${API}/${id}`, getHeaders(token));

const taskService = { getTasks, createTask, updateTask, deleteTask };
export default taskService;