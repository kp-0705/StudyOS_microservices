 
const express = require('express');
const cors    = require('cors');
const dotenv  = require('dotenv');

dotenv.config();

const authRoutes = require('./routes/auth');

const app = express();
app.use(cors());
app.use(express.json());

app.use('/api/auth', authRoutes);

app.get('/', (req, res) => {
  res.json({ service: 'Auth Service', status: 'running', port: 5002 });
});

module.exports = app;