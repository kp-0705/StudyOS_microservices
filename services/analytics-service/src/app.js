const express = require('express');
const cors    = require('cors');
const dotenv  = require('dotenv');

dotenv.config();

const analyticsRoutes = require('./routes/analyticsRoutes');

const app = express();
app.use(cors());
app.use(express.json());

app.use('/api/analytics', analyticsRoutes);

app.get('/', (req, res) => {
  res.json({ service: 'Analytics Service', status: 'running', port: 5004 });
});

app.get('/health', (req, res) => {
  res.status(200).json({ status: 'healthy', service: 'analytics-service' });
});

module.exports = app;
