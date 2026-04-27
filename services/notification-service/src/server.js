const app       = require('./app');
const connectDB = require('./config/db');
const dotenv    = require('dotenv');

dotenv.config();

const PORT = process.env.PORT || 5005;

connectDB().then(() => {
  app.listen(PORT, () => {
    console.log(`Notification Service running on port ${PORT}`);
  });
});
