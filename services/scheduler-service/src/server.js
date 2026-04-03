 
const app = require('./app');
const dotenv = require('dotenv');
const { startScheduler } = require('./scheduler');

dotenv.config();

const PORT = process.env.PORT || 5003;

app.listen(PORT, () => {
  console.log(`Scheduler Service running on port ${PORT}`);
  startScheduler();
});

