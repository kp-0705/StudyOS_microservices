const app       = require('./app');
const connectDB = require('./config/db');
const dotenv    = require('dotenv');

dotenv.config();

const PORT = process.env.PORT || 5002;

connectDB().then(() => {
  app.listen(PORT, () => {
    console.log(`Auth Service running on port ${PORT}`);
  });
});