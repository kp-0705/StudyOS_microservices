const express = require('express');
const cors    = require('cors');
const dotenv  = require('dotenv');

dotenv.config();

const notificationRoutes = require('./routes/notificationRoutes');

const app = express();
app.use(cors());
app.use(express.json());

app.use('/api/notifications', notificationRoutes);

app.get('/', (req, res) => {
  res.json({ service: 'Notification Service', status: 'running', port: 5005 });
});

app.get('/health', (req, res) => {
  res.status(200).json({ status: 'healthy', service: 'notification-service' });
});

module.exports = app;
