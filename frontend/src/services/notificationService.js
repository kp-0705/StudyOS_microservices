import axios from 'axios';

const API = 'http://localhost:5005/api/notifications';

const getHeaders = (token) => ({
  headers: { Authorization: `Bearer ${token}` }
});

const getNotifications = (token) => axios.get(API, getHeaders(token));

const notificationService = { getNotifications };
export default notificationService;
