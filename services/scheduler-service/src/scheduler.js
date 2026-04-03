 

const cron = require('node-cron');
const axios = require('axios');

const TASK_SERVICE_URL = process.env.TASK_SERVICE_URL || 'http://localhost:5001';

// Runs every day at 8:00 AM
const startScheduler = () => {

  console.log('Scheduler Service — cron jobs started');

  // Job 1: Check overdue tasks every day at 8am
  cron.schedule('0 8 * * *', async () => {
    console.log('Running overdue task check —', new Date().toLocaleString());
    try {
      const res = await axios.get(`${TASK_SERVICE_URL}/api/tasks/overdue`);
      const overdue = res.data;
      if (overdue.length === 0) {
        console.log('No overdue tasks');
      } else {
        console.log(`Found ${overdue.length} overdue tasks:`);
        overdue.forEach(t => {
          console.log(`  ⚠ [${t.category.toUpperCase()}] ${t.title} — due ${t.dueDate}`);
        });
      }
    } catch (err) {
      console.error('Overdue check failed:', err.message);
    }
  });

  // Job 2: Check due-today tasks every day at 8am
  cron.schedule('0 8 * * *', async () => {
    console.log('Running due-today check —', new Date().toLocaleString());
    try {
      const res = await axios.get(`${TASK_SERVICE_URL}/api/tasks/due-today`);
      const dueToday = res.data;
      if (dueToday.length === 0) {
        console.log('No tasks due today');
      } else {
        console.log(`${dueToday.length} tasks due today:`);
        dueToday.forEach(t => {
          console.log(`  ◎ [${t.category.toUpperCase()}] ${t.title}`);
        });
      }
    } catch (err) {
      console.error('Due-today check failed:', err.message);
    }
  });

  // Job 3: Print summary every minute (for demo/testing purposes)
  cron.schedule('* * * * *', () => {
    console.log(`Scheduler heartbeat — ${new Date().toLocaleString()} — watching deadlines`);
  });

};

module.exports = { startScheduler };