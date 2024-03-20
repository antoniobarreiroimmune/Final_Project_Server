const mongoose = require('mongoose');
const { procedureSchema } = require('./procedure.model'); 

const pathologySchema = new mongoose.Schema({
  ...procedureSchema.obj, 
 
  pathologyReport: {
    type: String,
    required: false,
    trim: true
  },
  pathologyCompleted: {
    type: Boolean,
    required: true,
    default: false 
  }
});

const Pathology = mongoose.model('Pathology', pathologySchema);

module.exports = { Pathology, pathologySchema };