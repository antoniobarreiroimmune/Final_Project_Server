const mongoose = require('mongoose');
const { procedureSchema } = require('./procedure.model'); 

const pathologySchema = new mongoose.Schema({
  ...procedureSchema.obj, 
 
  pathologyReport: {
    type: String,
    required: false,
    default: '',
    trim: true
  },
  pathologyCompleted: {
    type: Boolean,
    required: true,
    default: false 
  },
  pathologyInfo: {
    pathologyId: mongoose.Schema.Types.ObjectId,
    name: String,
    firstName: String,
    lastName: String,
    email: String,
  },
}, { timestamps: true }); 
 
  


const Pathology = mongoose.model('Pathology', pathologySchema);

module.exports = { Pathology, pathologySchema };