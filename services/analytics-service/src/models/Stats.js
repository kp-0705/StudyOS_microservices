const mongoose = require('mongoose');

const statsSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    unique: true
  },
  streak: { type: Number, default: 0 },
  totalTasksCompleted: { type: Number, default: 0 },
  tasksByCategory: {
    dsa: { type: Number, default: 0 },
    exam: { type: Number, default: 0 },
    assign: { type: Number, default: 0 },
    daily: { type: Number, default: 0 },
    goal: { type: Number, default: 0 }
  },
  lastActivityDate: { type: Date, default: Date.now }
}, { timestamps: true });

module.exports = mongoose.model('Stats', statsSchema);
