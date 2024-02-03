const mongoose = require('mongoose');

const blogdata = new mongoose.Schema({
    title: String,
    description: String,
    keyword :[String],
    websiteURL: String,
    images: [String],
    link:[String],
    likes: Number,
    views: Number
  });
  

const blogModal = mongoose.model("blogModal" , blogdata);

module.exports = blogModal