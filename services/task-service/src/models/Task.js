 
const mongoose = require('mongoose');

const taskSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  title:       { type: String, required: true, trim: true },
  description: { type: String, default: '' },
  category: {
    type: String,
    enum: ['dsa', 'exam', 'assign', 'daily', 'goal'],
    default: 'daily'
  },
  priority: {
    type: String,
    enum: ['high', 'med', 'low'],
    default: 'med'
  },
  dueDate:  { type: Date },
  progress: { type: Number, default: 0, min: 0, max: 100 },
  done:     { type: Boolean, default: false }
}, { timestamps: true });

module.exports = mongoose.model('Task', taskSchema);