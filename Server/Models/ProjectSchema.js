const mongoose = require('mongoose');

const projectSchema = new mongoose.Schema({
  type: {
    type: String,
    enum: ['coding', 'designing'],
    required: true,
  },
  title: String,
  tools:[String],
  image: [String],
  filters: [{
    type: String,
    required: true,
  }],
  overview: String,
  developmentProcess: String,
  demoVideo: String,
  finalThoughts: String,
  designs: [String],
  color: [String],
  preparation: String,
  executions: String,
  resources: {
    preview: String,
    github: String,
  },
  slug: {
    type: String,
    unique: true,
  },
});

module.exports = mongoose.model('Project', projectSchema);
