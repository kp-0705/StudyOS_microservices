 
const express = require('express');
const cors    = require('cors');
const dotenv  = require('dotenv');

dotenv.config();

const taskRoutes = require('./routes/tasks');

const app = express();
app.use(cors());
app.use(express.json());

app.use('/api/tasks', taskRoutes);

app.get('/', (req, res) => {
  res.json({ service: 'Task Service', status: 'running', port: 5001 });
});

module.exports = app;