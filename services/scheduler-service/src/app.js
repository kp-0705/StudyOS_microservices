 
const express = require('express');
const cors    = require('cors');
const dotenv  = require('dotenv');
const axios   = require('axios');

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

const TASK_SERVICE_URL = process.env.TASK_SERVICE_URL || 'http://localhost:5001';

// Health check
app.get('/', (req, res) => {
  res.json({ service: 'Scheduler Service', status: 'running', port: 5003 });
});

// Manually trigger overdue check
app.get('/api/schedule/overdue', async (req, res) => {
  try {
    const response = await axios.get(`${TASK_SERVICE_URL}/api/tasks/overdue`);
    res.json({
      message: 'Overdue tasks fetched',
      count: response.data.length,
      tasks: response.data
    });
  } catch (err) {
    res.status(500).json({ message: 'Could not reach Task Service', error: err.message });
  }
});

// Manually trigger due-today check
app.get('/api/schedule/due-today', async (req, res) => {
  try {
    const response = await axios.get(`${TASK_SERVICE_URL}/api/tasks/due-today`);
    res.json({
      message: 'Due today tasks fetched',
      count: response.data.length,
      tasks: response.data
    });
  } catch (err) {
    res.status(500).json({ message: 'Could not reach Task Service', error: err.message });
  }
});

module.exports = app;