const mongoose = require('mongoose');

const employeeSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true,
    unique: true
  },
  department: {
    type: String,
    required: true
  },
  skills: {
    type: [String],
    required: true
  },
  performanceScore: {
    type: Number,
    required: [true, 'Performance score is required']
  },
  experience: {
    type: Number,
    required: true
  }
});

module.exports = mongoose.model('Employee', employeeSchema);
