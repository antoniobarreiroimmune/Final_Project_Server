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
  },
  pathologyId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: false
  },
 
  
});

const Pathology = mongoose.model('Pathology', pathologySchema);

module.exports = { Pathology, pathologySchema };