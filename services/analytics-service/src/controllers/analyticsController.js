const Stats = require('../models/Stats');
const axios = require('axios');

exports.getUserStats = async (req, res) => {
  try {
    const userId = req.user.id;
    const token = req.headers.authorization;

    // Fetch tasks from Task Service
    const response = await axios.get(`${process.env.TASK_SERVICE_URL}/api/tasks`, {
      headers: { Authorization: token }
    });

    const tasks = response.data;
    const completedTasks = tasks.filter(t => t.done);

    const stats = {
      totalTasks: tasks.length,
      completedTasks: completedTasks.length,
      productivityScore: tasks.length > 0 ? (completedTasks.length / tasks.length) * 100 : 0,
      categoryBreakdown: {
        dsa: completedTasks.filter(t => t.category === 'dsa').length,
        exam: completedTasks.filter(t => t.category === 'exam').length,
        assign: completedTasks.filter(t => t.category === 'assign').length,
        daily: completedTasks.filter(t => t.category === 'daily').length,
        goal: completedTasks.filter(t => t.category === 'goal').length
      }
    };

    // Update or Create Stats in DB
    await Stats.findOneAndUpdate(
      { user: userId },
      { 
        totalTasksCompleted: completedTasks.length,
        tasksByCategory: stats.categoryBreakdown,
        lastActivityDate: new Date()
      },
      { upsert: true, new: true }
    );

    res.json(stats);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error fetching analytics' });
  }
};
