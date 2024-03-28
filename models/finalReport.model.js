const mongoose = require('mongoose');
const { pathologySchema } = require('./pathology.model'); 

const finalReportSchema = new mongoose.Schema({
  ...pathologySchema.obj, 
  
  finalReport: {
    type: String,
    required: false,
    trim: true
  },
  finalReportCompleted: {
    type: Boolean,
    required: true,
    default: false 
  },
  guardValidate:{
    type: Boolean,
    required: true,
    default: false
  },
  pathologyValidate:{ 
    type: Boolean,
    required: true,
    default: false
  },
  
}, { timestamps: true});

const FinalReport = mongoose.model('FinalReport', finalReportSchema);

module.exports = {FinalReport, finalReportSchema};