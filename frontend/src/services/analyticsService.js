import axios from 'axios';

const API = 'http://localhost:5004/api/analytics';

const getHeaders = (token) => ({
  headers: { Authorization: `Bearer ${token}` }
});

const getStats = (token) => axios.get(API, getHeaders(token));

const analyticsService = { getStats };
export default analyticsService;
