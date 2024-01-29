const mongoose = require('mongoose');

const formDataSchema = new mongoose.Schema({
    name: String,
    email: String,
    companyName: String,
    websiteURL: String,
    moreDetails: String,
    budget: String,
    services: {
      webDevelopment: Boolean,
      gameDev: Boolean,
      appDevelopment: Boolean,
    },
  });
  
  // Create a mongoose model based on the schema
  const FormDataModel = mongoose.model('FormData', formDataSchema);

  module.exports= FormDataModel;